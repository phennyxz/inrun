# INRUN — Guia visual v0.1

Arte 2D isométrica, **cartoon**, inspirada no Cerrado brasileiro. Todos os sprites compartilham a mesma geometria, direção de luz, paleta e contorno. Os elementos atuais são desenhados no próprio Canvas, sem ativos externos ou licenças de terceiros.

## Regras
- Tile-base nominal 128 × 64 pixels, losango 2:1.
- Personagem cartoon de cabeça grande; posição ancorada nos pés.
- Luz da esquerda superior; sombras elípticas projetadas para a direita.
- Contornos discretos, espessura comum na escala lógica; renderização Canvas 2D.
- Paleta: solo #b87849, areia #d8ae70, folhas #5e8251, madeira #79563e, rocha #938b76, camisa #e9bb61.
- Colisões são semânticas, independentes dos pixels de cada desenho.
- Não gerar quadros de animação independentes sem um modelo mestre.
- Assets exportados no futuro deverão registrar id, fonte, licença, dimensões, pivô, versão da paleta e revisão.

## Kit piloto
Chão, personagem corredor, pedra, tronco, árvore, arbusto, capim e sol colecionável. Todos são desenhados proceduralmente em `src/renderer.js`.

## Critérios de aceite
Mesma perspectiva, iluminação, escala relativa e pontos de apoio; legibilidade em telas pequenas; nenhuma dependência visual de um asset externo sem licença documentada.
