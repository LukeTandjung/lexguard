{
  description = "A pure Nix environment for your Python project";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = nixpkgs.legacyPackages.${system};
        gdk = pkgs.google-cloud-sdk.withExtraComponents( with pkgs.google-cloud-sdk.components; [
          gke-gcloud-auth-plugin
        ]);
      in
      {
        devShells.default = pkgs.mkShell {
          packages = with pkgs; [
            python312
            nodejs_22
            gdk
          ];

          env.LD_LIBRARY_PATH = pkgs.lib.makeLibraryPath [
            pkgs.stdenv.cc.cc.lib
            pkgs.libz
            pkgs.glib
            pkgs.pango
            pkgs.fontconfig
          ];
        };
      });
}
