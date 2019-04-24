import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, ScrollView, SectionList } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { ListItem, Card } from 'react-native-elements';
import Modal from 'react-native-modal';
import config from '../../config';
import { Button } from 'react-native-elements';

class SpeakersView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      conference: {speakers:[]},
      speaker: {},
      modal: false
    };
  }

  componentDidMount() {
    const { getInfo } = this.props;
    getInfo();
    this.setState({speaker: {},modal: false})
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.completed) {
      this.setState({
        conference: nextProps.conference,
        error: nextProps.error,
        completed: nextProps.completed,
        modal: false
      });
    }
  }

  render() {

    const getTeam = () => {

      if(typeof this.state.conference == 'undefined' && !this.state.conference.team){
        return null
      }

      let teams = [];

      for(var i in this.state.conference.team){
        let team = this.state.conference.team[i];
        teams.push({
          title: team.name,
          data: team.items,
        })
      }

      return (
        <SectionList
          renderItem={({item, index, section}) => 
            <ListItem
              key={index}
              avatar={{ uri: item.avatar }}
              title={item.name}
              subtitle={item.subtitle}
              onPress={()=>this.setState({speaker: item, modal: true})}
            />
          }
          
          renderSectionHeader={({section: {title}}) => (
            <Text style={{fontWeight: 'bold', backgroundColor: '#fff', padding: 15}}>{title}</Text>
          )}
          sections={teams}
          keyExtractor={(item, index) => item + index}
        />
      )
    }


    return (
      <View>
        <ScrollView>
        {getTeam()}
        {

            <Modal isVisible={this.state.modal}
                   onSwipe={() => this.setState({ modal: false })}
                   onBackdropPress={() => this.setState({ modal: false })}>
              <Card title={(this.state.speaker.name||'').toUpperCase()} image={{ uri: this.state.speaker.avatar }}>
                <View>
                  <Text style={{fontWeight:'700'}}>{this.state.speaker.subtitle}</Text>
                  <Text style={{textAlign: 'justify'}}>{this.state.speaker.bio}</Text>

                  <View style={{alignItems: 'flex-start', flexDirection: 'row'}}>
                    <Icon.Button name="twitter" backgroundColor="transparent" color={config.PRIMARY_BG_COLOR}>
                      <Text>@{this.state.speaker.twitter}</Text>
                    </Icon.Button>
                    <Icon.Button name="github" backgroundColor="transparent" color={config.PRIMARY_BG_COLOR}>
                      <Text>@{this.state.speaker.github}</Text>
                    </Icon.Button>
                  </View>
                  <Button
                    title='CLOSE'
                    buttonStyle={{
                      backgroundColor: config.PRIMARY_BG_COLOR,
                      marginTop: 10
                    }}
                    onPress={()=>this.setState({modal: false})}
                  />
                </View>
              </Card>
            </Modal>
        }
        </ScrollView>
      </View>
    );
  }

}

SpeakersView.propTypes = {
  getInfo: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired,
  conference: PropTypes.object.isRequired
};

export default SpeakersView;