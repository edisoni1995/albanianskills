import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  ScrollView, View, Text, Image
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import styles from './style.js';
import config from '../../config';

class AboutView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      conference: {},
    };
  }

  componentDidMount() {
    const { getInfo } = this.props;
    getInfo();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.completed) {
      this.setState({
        conference: nextProps.conference,
        error: nextProps.error,
        completed: nextProps.completed
      });
    }
  }

  render() {
    return (
      <ScrollView>
        <Image
          source={{uri: this.props.conference.banner}}
          style={styles.banner}
        />
        <View style={styles.container}>
          <Text style={styles.title}>{this.props.conference.name}</Text>
          <View style={styles.info}>
            <Icon.Button name="calendar" backgroundColor="transparent" color={config.PRIMARY_BG_COLOR}>
              <Text>{this.props.conference.date}</Text>
            </Icon.Button>
            <Icon.Button name="map-pin" backgroundColor="transparent" color={config.PRIMARY_BG_COLOR}>
              <Text>{(this.props.conference.location||{}).city}</Text>
            </Icon.Button>
          </View>
          <Text style={styles.description}>{this.props.conference.description}</Text>
          <Text style={styles.name}>App Developer Info:</Text>
          <View style={styles.author}>
            <Image
              source={{uri: 'https://www.albanianskills.org/wp-content/uploads/2019/03/edison-1-e1551498614742.jpg'}}
              style={styles.avatar}
            />
            <View>
              <Text>Edison Biba</Text>
              <Text style={styles.link}>edison.biba@gooleto.com</Text>
            </View>
          </View>
          <View style={styles.author}>
            <Image
              source={{uri: 'https://www.albanianskills.org/wp-content/uploads/2019/03/image_6483441-1-e1551500056424.jpg'}}
              style={styles.avatar}
            />
            <View>
              <Text>Arty Havalja</Text>
              <Text style={styles.link}>https://al.linkedin.com/in/artur-havalja</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }

}

AboutView.propTypes = {
  getInfo: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired,
  conference: PropTypes.object.isRequired
};

export default AboutView;