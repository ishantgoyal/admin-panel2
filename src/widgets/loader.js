import { LoadingOutlined } from '@ant-design/icons';
import React from 'react';

const SisLoader = () => {
    return (
        <div style={{ position: "relative", display: "block", height: "100px" }}>
            <div style={{ position: "absolute", left: "50%", top: "50%" }}>
                <LoadingOutlined style={{ fontSize: "26px" }} />
            </div>
        </div>
    );
};

export default SisLoader;