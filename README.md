# 🖥️ Workstation_v2.0: Estação Riana Comanetti

> **Status do Sistema**: ONLINE ● 
> **Versão**: Love_System_v1.0.25
> **Data de Lançamento**: 26 de Dezembro de 2025

Este projeto é uma **Workstation Neo-Retro** desenvolvida sob medida para Riana Comanetti. O sistema operacional simula a estética clássica do Windows 98 e o ambiente de escritório da Dunder Mifflin (The Office), operando com tecnologias modernas de alto desempenho.

---

## 🎨 O Conceito (The Concept)
A ideia central foi unir a nostalgia visual da computação dos anos 90 com uma experiência interativa e romântica. O site se comporta como um desktop funcional, adaptando seu layout de acordo com o dispositivo para garantir a melhor imersão.

---

## 🚀 Funcionalidades Principais

### 🏢 Layout Inteligente e Responsivo
* **Grid Dinâmico (PC)**: Organização em 3 colunas (proporção 3-6-3) que aproveita o espaço do monitor para exibir vários "apps" simultaneamente.
* **Prioridade Mobile**: No celular, o sistema reorganiza as janelas (`order-1`) para destacar o conteúdo principal (Fotos e Contador) no topo.
* **Desktop Icons**: Atalhos funcionais que utilizam `useRef` para navegação interna suave até as janelas correspondentes.

### 🎮 Heart_Game.exe (Ultra Spam Mode)
* **Motor de Spawn**: Lógica de geração frenética de corações (intervalo de 100ms) para um desafio de reflexos.
* **Simulação CRT**: Filtros SVG para curvatura de tela, scanlines horizontais e animação de flicker (chiado de monitor de tubo).
* **Animação de Clique**: Feedback tátil global onde todos os botões "afundam" ao serem pressionados, respeitando a física do Windows 98.

### 📂 Aplicativos da Estação
* **Ranking_Estação.exe**: Integração em tempo real com **Supabase** para persistência de recordes globais.
* **Dunder_Mifflin_Player.exe**: Player de áudio dedicado com as trilhas favoritas.
* **Contador_De_Amor.exe**: Timer preciso calculando o tempo de união.
* **memorando.txt**: Bloco de notas com galeria de fotos integrada e mensagens personalizadas.

---

## 🛠️ Stack Tecnológica
* **Frontend**: React.js com TypeScript (Tipagem estrita para estabilidade).
* **Estilização**: Tailwind CSS v4 (Design atômico e animações por GPU).
* **Backend**: Supabase (PostgreSQL & Realtime).
* **Deploy**: Vercel (Pipeline de CI/CD automática).

---

## 💾 Instalação e Execução

Para rodar uma instância local deste sistema:

1. Clone o repositório:
   ```bash
   git clone [https://github.com/seu-usuario/estacao-riana.git](https://github.com/seu-usuario/estacao-riana.git)
