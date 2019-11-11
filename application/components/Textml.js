import React, { Component } from "react";
import {
    View,
    Text,
    TouchableOpacity
} from "react-native";

export default class Textml extends Component {

  constructor(props){
    super(props);
    this.state = {
      res: "",
      link: ""
    }
  }

  componentDidMount() {
    var string = this.props.data;
    var matches = string.match(/\bhttps?:\/\/\S+/gi);
    var text_without_link = this.urlify(string);
    text_without_link = text_without_link.replace("Plus d'information en cliquant ici","");
    //console.log(matches, text_without_link);
    if(matches.length > 0) {
      this.setState({link: matches[0]});
    }
    this.setState({res: text_without_link});
  }

  urlify = (text) => {
    var urlRegex = /<\/?[^>]+(>|$)/g;
    return text.replace(urlRegex, "")
  }

  render() {
    return(
      <TouchableOpacity disabled={true} onPress={() => {this.props.onPress(this.state.link)}}>
        <Text style={this.props.style}>{this.state.res}</Text>
      </TouchableOpacity>
    )
  }

}
