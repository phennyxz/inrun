# INRUN — Game Design v0.1

**Gênero:** runner infinito arcade em três faixas com visual 2D isométrico cartoon. **Ambientação:** Cerrado estilizado. **Loop:** escolher faixa, saltar pedras, deslizar sob troncos, coletar sóis, pontuar por metros.

**Procedural:** chunks de 5 unidades derivados de seed e índice, sem RNG dependente da ordem de acesso. Cada chunk mantém ao menos uma faixa livre de obstáculos. Obstáculos podem ser evitados lateralmente ou com ação apropriada.

**Controles:** ações lógicas COVIL `left`, `right`, `up`, `down`, `pause`. O host controla início/pausa/retomada/encerramento em modo VLG. Teclas e botões HTML são auxiliares de desenvolvimento.

**Fases:** (1) MVP jogável; (2) sprites e animações refinadas; (3) balanceamento, áudio e acessibilidade; (4) build/validação VLG; (5) homologação no Jogai.

**Não incluído:** login, multiplayer, anúncios, compras, salvamento remoto, assinaturas de distribuição, verificação do host.
