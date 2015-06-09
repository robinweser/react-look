var HoverStyleMixin = {
   componentWillMount: function() {
       this.state = this.state || {};
       this.state.hovered = false;
     },
     componentDidMount: function() {
       this.getDOMNode().addEventListener("mouseover", this.onOver);
       this.getDOMNode().addEventListener("mouseout", this.onOut);
     },
     componentWillUnmount: function() {
       this.getDOMNode().removeEventListener("mouseover", this.onOver);
       this.getDOMNode().removeEventListener("mouseout", this.onOut);
     },
     onOver: function() {
       this.setState({ hovered: true });
     },
     onOut: function() {
       this.setState({ hovered: false });
     },
};

module.exports  = HoverStyleMixin;
