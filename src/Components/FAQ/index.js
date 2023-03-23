import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';

const Accordion = withStyles({
  root: {
    background: 'none',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    backgroundColor: '#f8eedf',
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    }
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiAccordionDetails);

export default function FAQ() {
  const [expanded, setExpanded] = React.useState('panel8');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div>
      <Accordion square expanded={expanded === 'panel8'} onChange={handleChange('panel8')}>
        <AccordionSummary aria-controls="panel8d-content" id="panel8d-header">
          <Typography>How to use WishGee?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Post your requirements at WishGee and sit back and relax while our our experts get the best product result along with bets deals for you.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion square expanded={expanded === 'panel7'} onChange={handleChange('panel7')}>
        <AccordionSummary aria-controls="panel7d-content" id="panel7d-header">
          <Typography>What can I search in WishGee?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          Best phone under 10,000 | Best gaming laptop in India | Best earphones under 4,000 | Best laptop for coding | best laptop under 50,000 | Best smart watch under 5,000 | 
          Best guitar for beginners | Best phone under 20,000 | Best phone under 30,000 | Best phone under 40,000 | Best laptop under 70,000 | Best ANC earphones under 10,000 | Best MTB cycle under 25,000 | 
          Best bluetooth speaker under 5,000 | Phone with best camera under 20,000 | Best Smart TV under 30,000 etc.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion square expanded={expanded === 'panel0'} onChange={handleChange('panel0')}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography>Is WishGee another e-commerce site like flipkart and amazon?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          No. WishGee is just a product recommendation service. We provide you a link for the product from the most genuine e-commerce like amazon and flipkart, but you're free to purchase it anywhere.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion square expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography>When will I get the result?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          You get the result immediately. But, if you're not satisfied with the immediate result, you can ask our Genie to do the reserach for you which can take upto 24 hours. You can check the status of your wish in your dashboard.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion square expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
          <Typography>How many wish can I make?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          Currently there are no limits. Although in future only 3 active/open wish will be allowed at a time.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion square expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
          <Typography>Is WishGee doing this for free?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          Yes.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion square expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
        <AccordionSummary aria-controls="panel4d-content" id="panel4d-header">
          <Typography>If it's free, how is WishGee making money?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          When you buy a product through Wishgee’s link we receive a small amount of profit from the seller’s side, which helps us to keep running this free service for you.</Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion square expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
        <AccordionSummary aria-controls="panel5d-content" id="panel5d-header">
          <Typography>Is my data safe with WishGee?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          Yes, your data is completely safe. The Genies will be able to view only the non PII attributes of your wish.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion square expanded={expanded === 'panel6'} onChange={handleChange('panel6')}>
        <AccordionSummary aria-controls="panel6d-content" id="panel6d-header">
          <Typography>Who are the Genies?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          Genies are product experts in specialised domains onboarded through our rigorous tests. And they're evaluated periodically.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}