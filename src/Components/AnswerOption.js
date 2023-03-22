import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';



const styles = {
  size: {
    width: 40,
    height: 40,
  },
  sizeIcon: {
    fontSize: 500,
  },
};



function quizType(props) {
  var type = "default"
  if(props.question === "What features/packages are you looking for?") {
      type = "package"
  } else if(props.question === "What features and packages are you looking for? (select all that applies)") {
      type = "truck"
  } else if(props.question === "Please provide your contact information") {
      type = "userContact"
  } 
  return type;
}

function packgageItems(item){
  return(
    <div>
      {item}
    </div>
  );
}

function handleSubmit(e){
  e.preventDefault();
}

function AnswerOption(props) {
  // eslint-disable-next-line default-case
  switch(quizType(props)) {
    case 'package': 
      return(
        <Grid item xs={12} sm={12} md={12} lg={4}>
          <Button className={props.classes.image} style={{textTransform: 'none'}} onClick={() => {
            props.onAnswerSelected(props.question, props.answerContent, props.answerType)
          }}>
            <Paper  id="paper" style={{fontSize: 28, color: 'white', background: '#07080fdc'}}>{props.answerContent}</Paper>
            <Paper  id="paper" style={{fontSize: 18, textAlign: 'left'}}>
              {props.answerPackageOptions.map(packgageItems)}
            </Paper>
          </Button>
        </Grid>
      )
    case 'truck': 
      return (
        <Grid item xs={4} style={{paddingLeft:"30px"}}>
          <FormControlLabel
            control={ <Checkbox className={styles.size} onChange={props.handleCheckboxes} value={props.answerContent} name={props.answerContent}/> }
            label={<Typography style={{fontSize: 20, color: "black"}}>{props.answerContent}</Typography>}
          />
        </Grid>
      )
    case 'userContact':
      return (
        <Grid item xs={12}>
          <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', flexDirection:'column'}}>
              <form id="input-box" noValidate autoComplete="off" onSubmit={handleSubmit}>
                <TextField onChange={(event) => {
                  props.onChangeName(event.target.value)
                }} id="outlined-basic" style={{textAlign: 'left'}} label={<Typography id="typography">Your name</Typography>} variant="outlined" inputProps={{min: 0, style: { textAlign: 'left', paddingTop: 30, fontSize: 20}}} />
              </form>
              <form id="input-box" noValidate autoComplete="off" onSubmit={handleSubmit}>
              <TextField onChange={(event) => {
                  props.onChangePhone(event.target.value)
                }} id="outlined-basic" style={{textAlign: 'left'}} label={<Typography id="typography">Your phone number</Typography>} variant="outlined" inputProps={{min: 0, style: { textAlign: 'left', paddingTop: 30, fontSize: 20}}} />
              </form>
              <form id="input-box" noValidate autoComplete="off" onSubmit={handleSubmit}>
              <TextField onChange={(event) => {
                  props.onChangeEmail(event.target.value)
                }} id="outlined-basic" style={{textAlign: 'left'}} label={<Typography id="typography">Your email</Typography>} variant="outlined" inputProps={{min: 0, style: { textAlign: 'left', paddingTop: 30, fontSize: 20}}} />
              </form>
          </div>
        </Grid>
      )
    case 'default': 
      return (
        <Grid item xs={6}>
          <Button className={props.classes.image} style={{textTransform: 'none'}} onClick={() => {
            props.onAnswerSelected(props.question, props.answerContent, props.answerType)
          }}>
            <Paper className={props.classes.paper} style={{fontSize: 18}}>{props.answerContent}</Paper>
          </Button>
        </Grid>
      )
  }
}

AnswerOption.propTypes = {
  answerType: PropTypes.string.isRequired,
  answerContent: PropTypes.string.isRequired,
  answer: PropTypes.string.isRequired,
  onAnswerSelected: PropTypes.func.isRequired
};

export default AnswerOption;
