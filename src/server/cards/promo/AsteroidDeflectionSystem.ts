import {IProjectCard} from '../IProjectCard';
import {IActionCard} from '../ICard';
import {Card} from '../Card';
import {CardName} from '../../../common/cards/CardName';
import {CardType} from '../../../common/cards/CardType';
import {CardResource} from '../../../common/CardResource';
import {Tag} from '../../../common/cards/Tag';
import {IPlayer} from '../../IPlayer';
import {CardRenderer} from '../render/CardRenderer';
import {Size} from '../../../common/cards/render/Size';
import {played} from '../Options';

export class AsteroidDeflectionSystem extends Card implements IActionCard, IProjectCard {
  constructor() {
    super({
      type: CardType.ACTIVE,
      name: CardName.ASTEROID_DEFLECTION_SYSTEM,
      tags: [Tag.SPACE, Tag.EARTH, Tag.BUILDING],
      cost: 13,

      resourceType: CardResource.ASTEROID,
      victoryPoints: {resourcesHere: {}},

      behavior: {
        production: {energy: -1},
      },

      metadata: {
        cardNumber: 'X14',
        renderData: CardRenderer.builder((b) => {
          b.action('REVEAL AND DISCARD the top card of the deck. If it has a space tag, add an asteroid here.', (eb) => {
            eb.empty().startAction.cards(1).asterix().nbsp.space({played}).colon().asteroids(1);
          }).br;
          b.production((pb) => pb.minus().energy(1)).text('opponents may not remove your plants', Size.SMALL, true);
        }),
        description: {
          text: 'Decrease your energy production 1 step. 1VP per asteroid on this card.',
          align: 'left',
        },
      },
    });
  }

  public canAct(): boolean {
    return true;
  }

  public action(player: IPlayer) {
    const topCard = player.game.projectDeck.draw(player.game);

    if(topCard === undefined) {
      this.logEmptyDeck(player);
    } else {
      this.logAttempt(player, topCard);

      if (topCard.tags.includes(Tag.SPACE)) {
        this.success(player);
      }

      player.game.projectDeck.discard(topCard);
    }

    return undefined;
  }

  private logAttempt(player: IPlayer, drawnCard: IProjectCard) {
    player.game.log(
      '${0} revealed and discarded ${1}',
      (b) => b.player(player).card(drawnCard, {tags: true}),
    );
  }

  private logEmptyDeck(player: IPlayer) {
    player.game.log(
      '${0} could not reveal a card from the deck as the deck is empty',
      (b) => b.player(player),
    );
  }

  private success(player: IPlayer) {
    player.addResourceTo(this, {qty: 1, log: true});
  }
}
