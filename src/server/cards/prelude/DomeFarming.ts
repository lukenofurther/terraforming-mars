import {Tag} from '../../../common/cards/Tag';
import {PreludeCard} from './PreludeCard';
import {CardName} from '../../../common/cards/CardName';
import {CardRenderer} from '../render/CardRenderer';
import {Units} from '../../../common/Units';

export class DomeFarming extends PreludeCard {
  public migrated = true;
  constructor() {
    super({
      name: CardName.DOME_FARMING,
      tags: [Tag.PLANT, Tag.BUILDING],
      productionBox: Units.of({megacredits: 2, plants: 1}),

      metadata: {
        cardNumber: 'P07',
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => pb.megacredits(2).plants(1));
        }),
        description: 'Increase your M€ production 2 steps and plant production 1 step.',
      },
    });
  }
  public play() {
    return undefined;
  }
}

