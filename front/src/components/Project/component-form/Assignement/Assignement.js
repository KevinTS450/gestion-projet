import React from "react";
import { useState , useEffect } from "react";



function Assignement (props) {


    const [size, setSize] = useState('middle');



return (<>
 <div className="flex flex-col gap-2">
  <label>Choisir des utilisateur</label>

  <Select
          mode="multiple"
          size={size}
          placeholder="Please select"
        //   defaultValue={['a10', 'c12']}
          onChange={handleChange}
          style={{
            width: '100%',
          }}
          options={options}
        />


 </div>

</>)


}

export default Assignement;