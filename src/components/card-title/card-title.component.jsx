import React from 'react';
import { Dropdown } from "react-bootstrap";


const CardTitle = (props) => {
    let { titleName } = props;
    return <h4 className="card-title">
        {titleName}
        {/* <div className="float-end btns_head d-flex">
            <button className="btn btn-theme btn-sm">Add</button>
            <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Action
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">
                        Another action
                    </Dropdown.Item>
                    <Dropdown.Item href="#/action-3">
                        Something else
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div> */}
    </h4>
}

export default CardTitle;