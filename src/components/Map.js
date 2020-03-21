import React from 'react'
import axios from 'axios'
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css'

const style = {
    width: '98%',
    height: '100%',
    right: '',
    margin: '0 auto',
    left:'0!important'
  }

class GMap extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            longitude : '',
            latitude : '',
            welcomeBtnClicked : this.props.welcomeBtn,
        }
    }

    getCoordinates = () => {
        this.timer = setInterval(() => {
            axios.get('https://cors-anywhere.herokuapp.com/http://api.open-notify.org/iss-now.json')
            .then(response => {
                this.setState({
                    longitude : response.data.iss_position.longitude,
                    latitude : response.data.iss_position.latitude
                })
            })
            .catch(err => alert(err))
        }, 2000);
    }

    render() {
        if(this.props.welcomeBtn && !this.state.welcomeBtnClicked) {
            this.getCoordinates()
            this.setState({
                welcomeBtnClicked:true
            })
        }

        return (
            <div className="map_container map p-3 mb-2 bg-dark text-white " id={this.props.id}>
                <div className="coordinates">
                    <h1 className="display-4">ISS real-time position</h1>
                    <div className="btn-container">
                        <div className="coordinates-info">
                            <p>long: {this.state.longitude}</p>
                            <p>lat: {this.state.latitude}</p>
                        </div>
                    </div>
                </div>

                <div className="justTheMap p-3 mb-2 bg-dark text-white" style={{ height:'100vh'}}>
                    <Map google={this.props.google} zoom={5}  
                    style={style} className="googleMap" center={{
                        lat: this.state.latitude,
                        lng: this.state.longitude
                        }}>

                    <Marker
                        title={'Bucharest'}
                        name={'Bucharest'}
                        position={{lat: this.state.latitude, lng: this.state.longitude}}/>

                    </Map>
                </div>
                    <hr/>

            </div>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: (process.env.REACT_APP_API_KEY)
  })(GMap)