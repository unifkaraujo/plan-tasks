import TelaPlanejamento from '../screens/Plan/TelaPlanejamento';
import TelaTarefas from '../screens/TaskList/TelaTarefas';
import cores from '../theme/cores';
import imagens from '../theme/imagens';
import {
  diasAPartirDeHoje,
  formatarDataCurta,
  formatarDiaSemana,
} from '../utils/datas';

const DIAS_NO_MENU = 5;

const rotuloComData = (prefixo, dias) =>
  `${prefixo} - ${formatarDataCurta(diasAPartirDeHoje(dias))}`;

const rotuloDiaSemana = dias =>
  rotuloComData(formatarDiaSemana(diasAPartirDeHoje(dias)), dias);

const rotaDia = (nome, diasAFrente, obterRotulo, cor = cores.outros) => ({
  nome,
  componente: TelaTarefas,
  obterRotulo,
  parametros: {
    diasAFrente,
    cor,
    imagem: diasAFrente === 0 ? imagens.amanha : imagens.hoje,
  },
});

export const ROTA_INICIAL_MENU = 'Hoje';

export const rotasMenu = [
  {
    nome: 'Planejamento',
    componente: TelaPlanejamento,
    obterRotulo: () => 'Planejamento',
    parametros: {cor: cores.planejamento, imagem: imagens.semana},
  },
  rotaDia('Hoje', 0, () => rotuloComData('Hoje', 0), cores.hoje),
  rotaDia('Amanha', 1, () => rotuloComData('Amanhã', 1)),
  rotaDia('Dia3', 2, () => rotuloDiaSemana(2)),
  rotaDia('Dia4', 3, () => rotuloDiaSemana(3)),
  rotaDia('Dia5', 4, () => rotuloDiaSemana(4)),
  {
    nome: 'EmAberto',
    componente: TelaTarefas,
    obterRotulo: () => 'Tasks em aberto',
    parametros: {somenteEmAberto: true, cor: cores.mes, imagem: imagens.mes},
  },
  {
    nome: 'OutraData',
    componente: TelaTarefas,
    obterRotulo: () => 'Outra data',
    secundaria: true,
    icone: 'calendar-outline',
    parametros: {
      escolherData: true,
      diasAFrente: DIAS_NO_MENU,
      cor: cores.calendario,
      imagem: imagens.calendario,
    },
  },
];

export const buscarRotaMenu = nome =>
  rotasMenu.find(rota => rota.nome === nome);
