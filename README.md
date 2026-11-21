# INRUN — Corre, Cerrado!

Runner infinito **2D isométrico cartoon**, com segmentos procedurais e distribuição experimental no formato **COVIL VLG 0.1**.

## Gameplay

- O personagem corre automaticamente por três faixas.
- **←/→** ou **A/D** mudam de faixa, **↑/W** salta pedras e **↓/S** desliza sob troncos.
- Colete sóis, avance na distância e evite obstáculos.
- Geração determinística por seed, com uma faixa livre em cada segmento.
- Sem bibliotecas gráficas externas: todos os desenhos são vetoriais em Canvas 2D, com paleta e projeção compartilhadas.

## Execução em desenvolvimento

O código importa `../covil-core.mjs`. Copie o arquivo `sdk/covil-core.mjs` de [covil-game-spec](https://github.com/phennyxz/covil-game-spec) para `covil-core.mjs` na raiz **somente para testar localmente**; no VLG o builder injeta automaticamente o SDK.

```sh
python3 -m http.server 8000
# http://localhost:8000
npm test
```

Para gerar o pacote, prepare uma pasta de staging com apenas `manifest.json`, `index.html`, `style.css` e `src/`, sem `covil-core.mjs`. Com o repositório da especificação clonado ao lado:

```sh
node ../covil-game-spec/tools/covil-build.mjs ./staging ./inrun.vlg
node ../covil-game-spec/tools/validate-vlg.mjs ./inrun.vlg
```

O pacote produzido assim é **VLG experimental não assinado**; homologação, distribuição, assinatura e host de produção são etapas separadas.

## Componentes

- `src/world.js`: chunks proceduralmente endereçáveis por seed e índice;
- `src/simulation.js`: regras de movimento, colisão e pontuação sem dependência de DOM;
- `src/renderer.js`: kit gráfico vetorial autoral e projeção isométrica;
- `src/main.js`: UI, modo local e adaptação ao lifecycle `init(covil)`;
- `docs/ASSET_STYLE_GUIDE.md`: contrato de consistência visual.

Estado: MVP experimental, ainda sem integração/homologação em host real, assets PNG exportados ou leaderboard.
