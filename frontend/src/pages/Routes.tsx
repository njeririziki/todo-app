import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './LandingPage';
import Todos from './TodoPage';

const AppRoutes: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />      
                <Route path="/todos" element={<Todos />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;