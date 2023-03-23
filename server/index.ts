import app from "./app";

const init = async () => {
  try {
    const port = process.env.PORT || 3000;
    // tslint:disable-next-line: no-console
    app.listen(port, () => console.log(`listening on port ${port}`));
  } catch (ex) {
    // tslint:disable-next-line: no-console
    console.log(ex);
  }
};

init();
