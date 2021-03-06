import * as Phaser from 'phaser';
import { Scene, SpriteState, EntityState, State, XY, MainScene, Events } from './Interfaces';
import { BehaviorSubject, Subject } from 'rxjs';

export class Globals {
  private static _instance: Globals;
  game: Phaser.Game;
  sprites = Array<string>();
  state = {
    sprites: new BehaviorSubject<SpriteState[][][]>(undefined),
    entities: new BehaviorSubject<EntityState[]>(undefined)
  };

  stateTransaction = {
    sprites: new Subject<void>(),
    entities: new Subject<void>()
  };

  canRerender = true;
  activeMainScene: MainScene;
  offsetToCenter = { x: 0, y: 0 } as XY;
  activePlayerName: string;

  activePlayerSprite: Phaser.GameObjects.Sprite;

  scalingFactor: number;

  events = new Array<Events<Scene>>();

  // call state.entities.next() on update
  getActivePlayer(): EntityState {
    return Globals.Instance.state.entities.value.find(
      (entity: EntityState) => entity.name === Globals.Instance.activePlayerName
    );
  }

  private constructor() {}

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }
}
