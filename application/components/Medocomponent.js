import React, { Component } from "react";
import {
    View,
    Text,
    TouchableWithoutFeedback
} from "react-native";
import Autolink from 'react-native-autolink';

export default class Medocomponent extends Component {

    constructor(props) {
      super(props);
      this.state = {
        viewMore: false
      }
    }

    render() {
        return (
          <View>
            {
              this.props.medoc && this.props.medoc.conditionsPrescriptionDelivrance ?
                <View style={{margin: 6, borderRadius: 10, backgroundColor: '#272830', justifyContent : 'center', padding: 20}}>
                  <Text style={{color: '#e3e4e8', fontSize: 18, marginTop: 12, fontWeight: 'bold'}}>Indication thérapeutiques</Text>
                  {
                    this.props.medoc.conditionsPrescriptionDelivrance.map((item,i) =>
                      <Text key={i} style={{color: '#e3e4e8', fontSize: 15, marginTop: 12 }}>{item}</Text>
                    )
                }
                </View>
              : null
            }
            {
               this.props.medoc && this.props.medoc.indicationsTherapeutiques ?
                <View style={{margin: 6, borderRadius: 10, backgroundColor: '#272830', justifyContent : 'center', padding: 20}}>
                  <Text style={{color: '#e3e4e8', fontSize: 18, marginTop: 12, fontWeight: 'bold'}}>Indication thérapeutiques</Text>
                  <TouchableWithoutFeedback onPress={() => {this.setState({viewMore: !this.state.viewMore})}}>
                    <Autolink
                    text={this.props.medoc.indicationsTherapeutiques}
                    mention="twitter"
                    phone={false}
                    email={false}
                    onPress={(url, match) => {
                      if(match.url) {
                        WebBrowser.openBrowserAsync(match.url)
                      }
                    }}
                    linkStyle={{ color:'#172061' , fontWeight:'bold'}}
                    numberOfLines={this.state.viewMore ? null : 3}
                    style={{color: '#e3e4e8', fontSize: 15, marginTop: 12}}/>
                  </TouchableWithoutFeedback>
                </View>
              : null
            }
            {
              this.props.medoc && this.props.medoc.conditionsPrescriptionDelivrance ?
                <View style={{margin: 6, borderRadius: 10, backgroundColor: '#272830', justifyContent : 'center', padding: 20}}>
                  <Text style={{color: '#e3e4e8', fontSize: 18, marginTop: 12, fontWeight: 'bold'}}>Conditions de prescriptions</Text>
                  {
                    this.props.medoc.conditionsPrescriptionDelivrance.map((item,i) =>
                      <Text key={i} style={{color: '#e3e4e8', fontSize: 15, marginTop: 12 }}>{item}</Text>
                    )
                }
                </View>
              : null
            }
          </View>
        );
    }
}
