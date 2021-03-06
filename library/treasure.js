/**
 * A Treasure object represents the player's character interacting in our world
 *
 * @class Treasure
 * @constructor
 * @param {Phaser.Game} game
 * @param {Phaser.Sprite} sprite
 */
Treasure = function (game, sprite, value) {
    this.game = game;
    this.sprite = sprite;
    this.body = this.sprite.body;
    this.value = value;
};

/**
 * Grabs treasure
 *
 * @method Treasure#grab
 */
Treasure.prototype.grab = function () {
    /*
     ToDos:
     - GoldCounter/Amount on Player/Visitor needs to go up by Gold Value X
     - Animation / Sound etc.
     - Maybe: Add dynamic gold amount from treasure object
     */

    var style = { font: "20px Arial", fill: "yellow", stroke: "black", strokeThickness: 7, align: "center" };

    // Add text
    text = this.game.add.text(this.body.position.x + 20, this.body.position.y, '+' + this.value + 'G', style);
    text.anchor.set(0.5);

    // Animate text
    var tween = this.game.add.tween(text).to({ y: this.body.position.y - 10, alpha: 0 }, 2000, Phaser.Easing.Linear.Out, true);

    // Remove text after animation is done
    tween.onComplete.add(function () {
        text.destroy();
    }, this);

    // Remove the treasure object (currently just moves the treasure really far away...)
    // @todo: add treasure.destroy(); or .kill() to actually remove the elements from memory? both behave kind of weirdly...
    this.body.position.x = -1000000;
    this.body.position.y = -1000000;

    // Remove treasure from global collection
    var index = treasures.indexOf(this);
    treasures.splice(index, 1);
};

/**
 * Creates and returns a new Treasure. Consumes an 'Game Object' with
 * type 'treasure'. Creates a sprite for the loaded Treasure image.
 * Enables the physics and returns the newly created Treasure.
 *
 * {@link http://phaser.io/docs/2.4.2/Phaser.Physics.html#enable}
 *
 * @method Treasure.create
 * @static
 * @param {Phaser.Game} game
 * @param {object} gameObject
 * @param {number} value - The treasure's value in gold coins
 * @return {Treasure}
 */
Treasure.create = function (game, gameObject, value) {
    var sprite = game.add.sprite(gameObject.x, gameObject.y, 'game_objects');
    sprite.frame = parseInt(gameObject.properties.frame);
    sprite.bringToTop();

    // How about some physics?
    game.physics.arcade.enable(sprite);

    return new Treasure(game, sprite, value);
};
