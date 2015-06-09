var React = require('react');
var Stylesheet = require('../src/Stylesheet.js').Stylesheet;

var LayoutTest = React.createClass({

    render: function () {
        var styles = Stylesheet.create(stylesheet);
        return (
            <div style={styles.box}>Blaaa
               <div style={styles.item}>Hallo</div>
            </div>
        );
    }
});
var stylesheet = {
    box: {
        backgroundColor: "blue",
        padding: 20,
        borderColor: "green",
        borderWidth: 1,
        borderStyle: "solid",
        transition: '200ms all linear'
    },
    item: {
        borderColor: "green",
        borderWidth: 1,
        borderStyle: "solid",
        backgroundColor: "green",
        padding: 30,
        color: "white",
        borderRadius: 10
    }
};

module.exports = LayoutTest;
