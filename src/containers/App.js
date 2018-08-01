import React, {Component} from 'react';
import { connect } from 'react-redux';

import { updateAutoComplete } from '../actions/main-action';

import Input from '../components/Input.jsx';
import AutoComplete from '../components/AutoComplete.jsx';

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      activeInput: false,
      activeAutoComplte: false,
      input: '',
      position: 'down',
      top: 0
    }

    this.inputFocus = this.inputFocus.bind(this)
    this.inputBlur = this.inputBlur.bind(this)
    this.inputChange = this.inputChange.bind(this)
    this.autocompleteHandler = this.autocompleteHandler.bind(this)

    this.input = React.createRef();
  }

  componentDidMount(){
    this.props.onGetCities()
  }

  inputFocus(e){

    const height = window.innerHeight;
    const posInput = e.target.getBoundingClientRect();
    const pos = (height/2) > posInput.top - 30 ? 'down': 'up'

    this.setState({
      activeInput: true,
      activeAutoComplte: true,
      position: pos,
      top: pos == 'down' ? posInput.top + posInput.height : posInput.top - (50*Object.keys(this.props.autocomlite).length + 2)
    })
  }

  inputBlur(){
    if(this.state.input == ''){
      setTimeout(()=>{
        this.setState({
          activeInput: false,
          activeAutoComplte: false
        })
      }, 150)

    }else{
      setTimeout(()=>{
        this.setState({
          activeAutoComplte: false
        })
      }, 150)
    }
  }

  inputChange(e){
    const height = window.innerHeight;
    const posInput = e.target.getBoundingClientRect();
    const pos = (height/2) > posInput.top - 30 ? 'down': 'up'

    this.props.onAutoComplete(e.target.value)
    this.setState({
      input: e.target.value,
      position: pos,
      activeAutoComplte: false
    })

    setTimeout(()=>{
      this.setState({
        top: pos == 'down' ? posInput.top + posInput.height : posInput.top - (50*Object.keys(this.props.autocomlite).length + 2),
        activeAutoComplte: true
      })
    }, 100)
  }

  autocompleteHandler(city){
    this.props.onAutoComplete(city)
    setTimeout(()=>{
      this.setState({
        input: city,
        activeInput: true,
        activeAutoComplte: false
      })
    }, 200)
  }

  render(){
    const { autocomlite } = this.props;
    const { activeAutoComplte, activeInput , input, position, top } = this.state;
    return <div className='wrap'>
            <Input
              ref={e => this.input = e}
              active={activeInput}
              value={input}
              position={position}
              activeAutoComplte={activeAutoComplte}
              inputFocus={this.inputFocus}
              inputBlur={this.inputBlur}
              inputChange={this.inputChange}
              />
            {
              activeAutoComplte ?
                <AutoComplete
                  top={top}
                  autocomlite={autocomlite}
                  position={position}
                  value={input}
                  mobile={mobilecheck()}
                  handlerClick={this.autocompleteHandler}
                />
              : null
            }

           </div>;
  }
}


const mobilecheck = function() {
  var check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};

export default connect(
  state => ({
    autocomlite: state.mainState.autocomlite
  }),
  dispatch => ({
    onGetCities:() => {
      dispatch({type: 'GET_CITIES'})
    },
    onAutoComplete:(search) => {
      dispatch(updateAutoComplete(search))
    },
  })
)(App);
