{ pkgs, ... }:

{
  packages = with pkgs; [
    nodejs
    vtsls
  ];
}
