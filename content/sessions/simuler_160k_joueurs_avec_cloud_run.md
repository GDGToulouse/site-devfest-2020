---
key: simuler_160k_joueurs_avec_cloud_run
title: Simuler 160K joueurs avec Cloud Run
id: nT3MZqgRIO6e4fcFMwwo
language: French
talkType: conference
tags:
  - _cloud___devops
complexity: Intermediate
speakers:
  - valentin_deleplace
draft: false

---

Comment vérifier que le jeu Google I/O Adventure (mai 2021) tiendra la charge de 80000 connections simultanées, sans s'effondrer? Comment provisionner correctement les serveurs de jeu?

Avec un test de charge, bien sûr.

Compte tenu de la technologie WebSocket choisie pour le jeu lui-même, nous allons utiliser Cloud Run comme "client" pour injecter des joueurs, détecter des bugs et des faiblesses architecturales, et ajuster les composants Google Cloud côté serveur. Avec pragmatisme, car le temps presse!