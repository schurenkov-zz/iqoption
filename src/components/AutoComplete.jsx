import React from 'react';

export default (props) => {
  const { autocomlite, position, top } = props;
  return !props.mobile ?
          <div style={{top: top}} className={position == 'down' ? 'autocomplete autocomplete-down' : 'autocomplete autocomplete-up' }>
          {
            Object.keys(autocomlite).map((i)=>
              <div
                key={i}
                className='autocomplete__item'
                onClick={()=> props.handlerClick(autocomlite[i])}>
                {
                  props.value == '' ?
                    autocomlite[i]
                  :
                    <div dangerouslySetInnerHTML={{ __html:(() => {
                      var text = '';
                      var arr = autocomlite[i].toLowerCase().split(props.value.toLowerCase());

                      arr.forEach((v,i)=> {
                        text += v;
                        if(i != (arr.length-1)){
                          var value = props.value.toLowerCase();

                          if(i==0 && v == ''){
                            value = props.value.charAt(0).toUpperCase() + props.value.substr(1)
                          }
                          text += `<span class="autocomplete__item-search">${value}</span>`
                        }
                      })

                      return text.charAt(0).toUpperCase() + text.substr(1);
                    })()}} />
                }
              </div>
            )
          }
         </div>
         :
          <select>
            <option>Тест</option>
          </select>
}
