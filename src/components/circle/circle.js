import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import './circle.css';

const styles = theme => ({
    progress: {
        margin: theme.spacing.unit * 2
    }
});

class CircularStatic extends React.Component {
    state = {
        completed: 0
    };

    componentDidMount() {
        this.timer = setInterval(this.progress, 70);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    progress = () => {
        const {completed} = this.state;
        this.setState({
            completed: completed >= this.props.value ? this.props.value : completed + 5
        });
    };

    render() {
        const {classes} = this.props;
        let circleColor;
        if (this.props.value < 50) {
            circleColor = 'red';
        } else if (this.props.value < 75) {
            circleColor = 'orange';
        } else {
            circleColor = 'green';
        }
        return (
            <div className={`circle ${circleColor}`}>
                <div className="circle__value">{this.props.value}</div>
                <CircularProgress
                    className={classes.progress}
                    variant="static"
                    size={100}
                    value={this.state.completed}
                />
            </div>
        );
    }
}

CircularStatic.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CircularStatic);
