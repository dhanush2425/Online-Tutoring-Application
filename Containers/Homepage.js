import React, { Component } from "react";
import Header from "./Header";
import KalisuCarousel from "./KalisuCarousel";
import Footer from "./Footer";
import Tutors from "./Tutors";
import Students from "./Students";
import SearchBar from "./SearchBar";
import "../Containers/Style.css";
import TutorInfo from "./TutorInfo";
import axios from 'axios';


class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tutors: [],
      filterText: "",
      students: [],
      selectedTutor: null
    };
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    this.handleChangeTutor = this.handleChangeTutor.bind(this);
  }

  handleFilterTextChange(filterText) {
    this.setState({ filterText: filterText });
  }
  handleChangeTutor(_tutor) {
    this.setState({ selectedTutor: _tutor });
    this.props.handleChangeTutor(_tutor);
  }

  componentDidMount() {
    axios.get("http://localhost:3001/tutor").then((res) => {
      const tutorsList = res.data;
      this.setState({ tutors: tutorsList });
    }).catch((err) => console.log(err));

    axios.get("http://localhost:3001/student").then((res) => {
      const studentList = res.data;
      this.setState({ students: studentList });
    }).catch((err) => console.log(err));

  }

  render() {
    return (
      <div>
        <Header user={this.props.user} />
        <KalisuCarousel />
        <SearchBar
          filterText={this.state.filterText}
          onFilterTextChange={this.handleFilterTextChange}
        />
        <Tutors
          tutorsList={this.state.tutors}
          filterText={this.state.filterText}
          handleChangeTutor={this.handleChangeTutor}
        />
        <Students studentsList={this.state.students} />
        <Footer />
      </div>
    );
  }
}

export default Homepage;
