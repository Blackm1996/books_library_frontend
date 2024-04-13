import { connect } from "react-redux";

function HomeAdmin(props) {
  return <section>قريبا</section>;
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
  };
};

export default connect(mapStateToProps)(HomeAdmin);
