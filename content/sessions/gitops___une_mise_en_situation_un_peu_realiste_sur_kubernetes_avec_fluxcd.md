---
key: gitops___une_mise_en_situation_un_peu_realiste_sur_kubernetes_avec_fluxcd
title: GitOps , une mise en situation un peu réaliste sur Kubernetes avec FluxCD
id: grExMwZ2uPDwi4m897vO
language: French
talkType: codelab
tags:
  - _cloud___devops
complexity: Intermediate
speakers:
  - laurent_grangeau
  - ludovic_piot
draft: false

---

T’en as assez des _talks_ qui déploient des _hello-world_ pour démontrer la pertinence de l’outil *younameit*.  
Ça tombe bien : ce qui nous intéresse, c’est plutôt d’essayer une mise en situation **DevSecOps** un peu réaliste.
On va donc construire pas à pas un scénario d’entreprise  avec une _dev team_, qui déploie / update / rollback des _WebApps_ Pokémon sur `Kubernetes` via des _charts_ `Helm`.  
Une seconde _dev team_ utilisera `Kustomize`, pour le même usage.  
Et côté _Ops_, on va aussi se préoccuper des enjeux de sécurité de la plateforme : ségrégations des droits des équipes, des flux réseau des WebApps, _patch management_ transparent sur la stack technique, métrologie, contrôle des activités sur le _cluster_.  
On va voir comment ces équipes **collaborent** entre elles au quotidien dans un _workflow_ **GitOps** qui s’appuie sur `Kubernetes`, `FluxCD`, `Azure DevOps`, et plein d’autres choses encore…