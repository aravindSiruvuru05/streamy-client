import React from 'react';
import { connect } from 'react-redux';
import { fetchStream } from '../../actions';
import flv from 'flv.js';
//flv is about downloading that video stream and converting into some file that can be palyed in html video tag  a bit like   .. 
// it is bit like axios reaches to some remote server get some data and server up our application
class StreamShow extends React.Component {

    constructor(props){
        super(props);

        this.videoRef = React.createRef();
    }

    componentDidMount(){
        const { id } = this.props.match.params;
        this.props.fetchStream(id);
        this.buildPlayer();
    }

    componentDidUpdate(){
        this.buildPlayer();
    }

    componentWillUnmount(){
        this.player.destroy();
    }

    buildPlayer(){
        const { id } = this.props.match.params;

        if(this.player || !this.props.stream){
            return;
        }

        this.player = flv.createPlayer({
            type:'flv',
            url: `http://localhost:8000/live/${id}.flv`
        });
        // console.log(this.videoRef.current);
        this.player.attachMediaElement(this.videoRef.current);
        this.player.load();
    }
    
    render(){
        if(!this.props.stream){
            return <div>loading...</div>
        }

        const { title , description } = this.props.stream;

        return (
            <div>
                <video ref={this.videoRef} style={{width:'100%'}} controls={true}/>
                <h1>{title}</h1>
                <h5>{description}</h5>
            </div>
        );
    }
}
const mapStateToProps = (state, ownProps) => {
    return { stream: state.stream[ownProps.match.params.id]}
}
export default connect( mapStateToProps, { fetchStream })(StreamShow);