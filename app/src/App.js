import React, { Component } from 'react';
import { Carousel, Jumbotron } from 'react-bootstrap';
import Form from './components/Form/Form';


import "./App.css"
import i1 from './images/11.jpg'
import i2 from './images/2.jpg'
import i3 from './images/3.jpg'
import i4 from './images/4.jpg'
import i5 from './images/5.jpg'
import i6 from './images/6.jpg'
import i7 from './images/7.jpg'
import i8 from './images/8.jpg'
import i9 from './images/9.jpg'
import i10 from './images/10.jpg'
import i11 from './images/1.jpg'
import i12 from './images/12.jpg'
import i13 from './images/13.jpg'
import i14 from './images/14.jpg'
import i15 from './images/15.jpg'
import i16 from './images/16.jpg'
import i17 from './images/17.jpg'
import i18 from './images/18.jpg'
import i20 from './images/20.jpg'
import i21 from './images/21.jpg'
import i19 from './images/22.jpg'



class App extends Component {
  state = {
    i1, i2, i3, i4, i5, i6, i7, i8, i9, i10, i11, i12, i13, i14, i15, i16, i17, i18,  i20, i21, i19
  }
  render() {
    const images = []
    for (var i = 1; i < 21; i++){
      images.push({ name: i, source: this.state['i'+i] })
    }
    return (
      <div className='body'>
        <Jumbotron>
          <Carousel>
            {images.map(({ name, source }) => (
              <Carousel.Item key={name}>
                <img width={900} height={500} alt={name} src={source} />
              </Carousel.Item>))}
          </Carousel>
        </Jumbotron>
    

      <div class = 'form'>
        <Form>
        </Form>
        </div>
      </div>
    )
  }
}
export default App