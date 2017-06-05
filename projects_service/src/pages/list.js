import React from 'react';

//import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText, FlatButton } from 'material-ui';
import { List, ListItem, Divider } from 'material-ui';

//import API
import { ROOT_URL } from '../config/config';

//
// const Page1 = () => (
//   <div>Page 1</div>
// );
// const Page2 = () => (
//   <div>Page 2</div>
// );
// const Page3 = () => (
//   <div>Page 3</div>
// );
//
const ListProject = () => (
    <List>
      <ListItem primaryText="Page 1" />
      <Divider />
      <ListItem primaryText="Page 2" />
      <Divider />      
      <ListItem primaryText="Page 3" />
    </List>
)

export default ListProject;