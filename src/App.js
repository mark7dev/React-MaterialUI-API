import React, { Component } from 'react';
import './App.css';

import request from 'superagent';

import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { TextField } from '@material-ui/core';

class App extends Component {
  constructor() {
    super();

    this.state = {
      open: false,
      companies: [],
      //Creating company with form
      companyName: ''
    };
  }


  toggleDrawer = () => {
    this.setState({
      open: !this.state.open
    });
  };

  //Creating company with form
  fetchCompanies = () => {
    request
      .get('http://localhost:3000/api/v1/companies')
      .then(response => {
        this.setState({
          companies: response.body.companies
        });
      });
  }

  //Creating company with form
  componentWillMount = () => {
    this.fetchCompanies()
  }

  //Creating company with form
  onSaveCompany = e => {
    e.preventDefault();

    request
      .post('http://localhost:3000/api/v1/companies')
      .send({
        name: this.state.companyName
      })
      .set('Content-Type', 'application/json')
      .then(this.fetchCompanies);
  }

  saveCompanyNameInState = e => {
    this.setState({
      companyName: e.target.value});
  }

  //Code to test request on console chrome
  // onSaveCompany = e => {
  //   const company = {
  //     name: this.refs.companyName
  //   };

  //   request
  //     //Type of information
  //     .set('Content-Type', 'application/json')
  //     //Endpoint
  //     .post('http://localhost:3000/api/v1/companies')
  //     //Send object to endpoint
  //     .send('company')
  //     //Respuesta
  //     .then(newCompany => {
  //       console.log(newCompany);
  //     });
  // }


  render() {
    const AppBarStyles = {
      flex: 1
    };

    const ListItemTextStyle = {
      width: 200
    };

    const TableStyles = {
      marginTop: 30
    };

    return (
      <React.Fragment>
        <AppBar position='static'>
          <Toolbar>
            <IconButton onClick={ this.toggleDrawer } color="inherit" aria-label="Menu">
              <MenuIcon />
           </IconButton>
           <Typography style={ AppBarStyles } variant="title" color="inherit">
              Muktek
            </Typography>
            <Button color='inherit'>Login</Button>
          </Toolbar>

          <Drawer open={ this.state.open } onClose={ this.toggleDrawer }>
            <div
              tabIndex={0}
              role="button"
              onClick={ this.toggleDrawer }
              onKeyDown={ this.toggleDrawer }
            >
              <List>
                <ListItem>
                  <ListItemText style={ ListItemTextStyle } primary="Inbox" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Sent" />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText primary="Spam" />
                </ListItem>
              </List>
            </div>
          </Drawer>
        </AppBar>

        <Table style={ TableStyles }>
         <TableHead>
           <TableRow>
             <TableCell>id</TableCell>
             <TableCell>Company Name</TableCell>
           </TableRow>
         </TableHead>
         <TableBody>
          { this.state.companies.map(company => {
            return (
              <TableRow key={ company._id }>
                <TableCell>{ company._id }</TableCell>
                <TableCell>{ company.name }</TableCell>
              </TableRow>
            );
          }) }
         </TableBody>
       </Table>
       {/* Creating company with form */}
       <form onSubmit={ this.onSaveCompany }>
       <div>
        <TextField
          id="company-name"
          label="Company Name"
          onChange={ this.saveCompanyNameInState }
        />
        <Button color='secondary' type='submit'>Save</Button>

       </div>
       </form>
      </React.Fragment>
    );
  }
}

export default App;
