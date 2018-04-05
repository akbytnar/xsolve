import React, {Component} from 'react';
import DateTimePicker from 'react-datetime-picker';
import {
    BootstrapTable,
    TableHeaderColumn
} from 'react-bootstrap-table';
import '../node_modules/react-bootstrap-table/css/react-bootstrap-table.css';

class App extends Component {
    initialData = require('./data.json');
    sortIcon = require('./icons/22384-200.png');
    nextIcon = require('./icons/next.png');
    prevIcon = require('./icons/prev.png');

    componentWillMount() {

        this.initialData.forEach(function (element) {
            let allDateTable = element.dateOfBirth.split(" ");
            let dateTable = allDateTable[0].split(".");
            element.dateOfBirth = dateTable[1] + "." + dateTable[0] + "." + dateTable[2] + " " + allDateTable[1];
        });

    }

    constructor() {
        super();
        this.state = {
            page: 1,
            dataToShow: this.initialData.slice(0, 5),
            data: this.initialData,
            dateFrom: null,
            dateTo: null,
            idReverse: false,
            noteReverse: false,
            firstNameReverse: false,
            lastNameReverse: false,
            companyReverse: false,
            dateReverse: false,
        };
    }

    showFive = () => {
        this.setState({
            dataToShow: this.state.data.slice((this.state.page - 1) * 5, 5 * this.state.page)
        });

    };
    nextPage = () => {
        this.setState({
            page: this.state.page + 1
        }, () => {
            this.showFive();
        })
    };
    prevPage = () => {
        this.setState({
            page: this.state.page - 1
        }, () => {
            this.showFive();
        })
    };

    handleChange = whatChanged => event => {
        this.setState({
            data: this.initialData.filter(el => el[whatChanged].toString().includes(event.target.value)),
            page: 1
        }, () => {
            this.showFive();
        });

    };
    handleChangeDataFrom = dateFrom => {
        if (!this.state.dateTo && !dateFrom) {
            this.setState({
                data: this.initialData,
                dateFrom: dateFrom,
                page: 1
            }, () => {
                this.showFive();
            })
        } else {
            if (this.state.dateTo) {
                this.currentFilter = this.initialData.filter(el => (new Date(el.dateOfBirth) > dateFrom) && (new Date(el.dateOfBirth) < this.state.dateTo));
            } else {
                this.currentFilter = this.initialData.filter(el => new Date(el.dateOfBirth) > dateFrom);

            }
            this.setState({
                data: this.currentFilter,
                dateFrom: dateFrom,
                page: 1
            }, () => {
                this.showFive();
            });
        }


    };
    handleChangeDataTo = dateTo => {
        if (!this.state.dateFrom && !dateTo) {
            this.setState({
                data: this.initialData,
                dateTo: dateTo,
                page: 1
            }, () => {
                this.showFive();
            })
        } else {
            if (this.state.dateFrom) {
                this.currentFilter = this.initialData.filter(
                    el => (new Date(el.dateOfBirth) < dateTo) && (new Date(el.dateOfBirth) > this.state.dateFrom)
                );
            } else {
                this.currentFilter = this.initialData.filter(
                    el => new Date(el.dateOfBirth) < dateTo
                );

            }
            this.setState({
                data: this.currentFilter,
                dateTo: dateTo,
                page: 1
            }, () => {
                this.showFive();
            });
        }


    };

    sortById = () => {
        this.initialData.sort(function (a, b) {
            return a.id - b.id;
        });
        if (this.state.idReverse) {
            this.initialData.reverse();
        }

        this.setState({
            data: this.initialData,
            idReverse: !this.state.idReverse,
            page: 1
        }, () => {
            this.showFive();
        });
    };
    sortByNote = () => {
        this.initialData.sort(function (a, b) {
            return a.note - b.note;
        });
        if (this.state.noteReverse) {
            this.initialData.reverse();
        }
        this.setState({
            data: this.initialData,
            noteReverse: !this.state.noteReverse,
            page: 1
        }, () => {
            this.showFive();
        });
    };
    sortByFirstName = () => {
        this.initialData.sort(function (a, b) {
            return (a.firstName < b.firstName) ? -1 : (a.firstName > b.firstName) ? 1 : 0;
        });
        if (this.state.firstNameReverse) {
            this.initialData.reverse();
        }
        this.setState({
            page: 1,
            data: this.initialData,
            firstNameReverse: !this.state.firstNameReverse
        }, () => {
            this.showFive();
        });
    };
    sortByLastName = () => {
        this.initialData.sort(function (a, b) {
            return (a.lastName < b.lastName) ? -1 : (a.lastName > b.lastName) ? 1 : 0;
        });
        if (this.state.lastNameReverse) {
            this.initialData.reverse();
        }
        this.setState({
            data: this.initialData,
            lastNameReverse: !this.state.lastNameReverse,
            page: 1
        }, () => {
            this.showFive();
        });
    };
    sortByCompany = () => {
        this.initialData.sort(function (a, b) {
            return (a.company < b.company) ? -1 : (a.company > b.company) ? 1 : 0;
        });
        if (this.state.companyReverse) {
            this.initialData.reverse();
        }
        this.setState({
            data: this.initialData,
            companyReverse: !this.state.companyReverse,
            page: 1
        }, () => {
            this.showFive();
        });
    };
    sortByDate = () => {
        this.initialData.sort(function (a, b) {
            return new Date(b.dateOfBirth) - new Date(a.dateOfBirth);
        });
        if (this.state.dateReverse) {
            this.initialData.reverse();
        }
        this.setState({
            data: this.initialData,
            dateReverse: !this.state.dateReverse,
            page: 1
        }, () => {
            this.showFive();
        });
    };

    render() {
        return (
            <div className="App">
                <BootstrapTable data={this.state.dataToShow}>
                    <TableHeaderColumn isKey dataField='id'>
                        ID <span onClick={this.sortById}><img src={this.sortIcon} alt={'sort'}/></span>
                        <input type="text" name="name" onChange={this.handleChange("id").bind(this)}/>
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField='firstName'>
                        First name <span onClick={this.sortByFirstName}><img src={this.sortIcon}
                                                                             alt={'sort'}/></span>
                        <input type="text" name="name" onChange={this.handleChange("firstName").bind(this)}/>
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField='lastName'>
                        Last name <span onClick={this.sortByLastName}><img src={this.sortIcon}
                                                                           alt={'sort'}/></span>
                        <input type="text" name="name" onChange={this.handleChange("lastName").bind(this)}/>
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField='dateOfBirth'>
                        Date of birth
                        <span onClick={this.sortByDate}><img src={this.sortIcon} alt={'sort'}/></span>

                        <DateTimePicker className="up"
                                        onChange={this.handleChangeDataFrom}
                                        value={this.state.dateFrom}
                        />
                        <h5>to</h5>

                        <DateTimePicker className="down"
                                        onChange={this.handleChangeDataTo}
                                        value={this.state.dateTo}
                        />
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField='company'>
                        Company <span onClick={this.sortByCompany}><img src={this.sortIcon}
                                                                        alt={'sort'}/></span>

                        <input type="text" className="text-filter-input form-control" name="name"
                               onChange={this.handleChange("company")}/>

                    </TableHeaderColumn>
                    <TableHeaderColumn dataField='note'>
                        Note <span onClick={this.sortByNote}><img src={this.sortIcon}
                                                                  alt={'sort'}/></span>
                        <input type="text" name="name" onChange={this.handleChange("note")}/>
                    </TableHeaderColumn>
                </BootstrapTable>
                <div className="nav">
                    {this.state.page > 1 ? (
                        <a onClick={this.prevPage}> <img alt={'prev'} src={this.prevIcon}/></a>) : null}
                    {(this.state.page < this.state.data.length / 5) ? (
                        <a onClick={this.nextPage}> <img alt={'prev'} src={this.nextIcon}/></a>) : null}
                </div>
            </div>
        );
    }
}

export default App;
