var React = require('react');
var Stylesheet = require('../src/Stylesheet.js');

var LayoutTest = React.createClass({
   render: function () {
      var styleString = JSON.stringify(styles);
      return (
         <div>
            <div style={styles.box}>{styleString}
            </div>
            <div style={styles.item}>TestElement</div>
         </div>
      );
   }
});

var styles = Stylesheet.create({
   box: {
      backgroundColor: "grey",
      wordWrap: 'break-word',
      padding: 20,
      borderColor: "blue",
      borderWidth: 1,
      borderStyle: "solid",
      transition: '200ms all linear'
   },
   item: {
      borderColor: "green",
      borderWidth: 1,
      borderStyle: "solid",
      backgroundColor: "blue",
      padding: 30,
      color: "white",
      borderRadius: 10
   }
});

module.exports = LayoutTest;
