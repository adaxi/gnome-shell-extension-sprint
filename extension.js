
const St = imports.gi.St;
const Main = imports.ui.main;
const Tweener = imports.ui.tweener;

let text, button;

function _hideStories() {
    Main.uiGroup.remove_actor(text);
    text = null;
}

function _showStories() {

    var sprintNumber = Math.ceil((new Date().getTime() / 1000 - new Date("2009-04-20").getTime()/1000) / 60 / 60 / 24 / 14 );

    if (!text) {
        text = new St.Label({ style_class: 'sprint-label', text: sprintNumber + "" });
        Main.uiGroup.add_actor(text);
    }

    text.opacity = 255;

    let monitor = Main.layoutManager.primaryMonitor;

    text.set_position(monitor.x + Math.floor(monitor.width / 2 - text.width / 2),
                      monitor.y + Math.floor(monitor.height / 2 - text.height / 2));

    Tweener.addTween(text,
                     { opacity: 0,
                       time: 2,
                       transition: 'easeOutQuad',
                       onComplete: _hideStories });
}

function init() {

    var sprintNumber = Math.ceil((new Date().getTime() / 1000 - new Date("2009-04-20").getTime()/1000) / 60 / 60 / 24 / 14 );

    button = new St.Bin({ style_class: 'panel-button',
                          reactive: true,
                          can_focus: true,
                          x_fill: true,
                          y_fill: false,
                          track_hover: true });
    let icon = new St.Label({ "text": sprintNumber + ""});

    button.set_child(icon);
    button.connect('button-press-event', _showStories);
}

function enable() {
    Main.panel._rightBox.insert_child_at_index(button, 0);
}

function disable() {
    Main.panel._rightBox.remove_child(button);
}
