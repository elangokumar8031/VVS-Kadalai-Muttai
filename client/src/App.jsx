  
  import AppRoutes from "./routes/AppRoutes";
  
  import CartDrawer from "./components/CartDrawer"; // ✅ ADD



  function App() {
    return (
      <>
         <CartDrawer /> 

        <AppRoutes />
        
      </>
    );
  }

  export default App;
