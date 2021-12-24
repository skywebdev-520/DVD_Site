export default function Modal({ addItems }) {
  return (
    <div className="modal fade" id="myModal" role="dialog">
      <div className="modal-dialog">
        <div className="modal-content">
          <form
            className="addForm"
            onSubmit={(event) => {
              addItems(event);
            }}
            encType="multipart/form-data"
          >
            <div className="modal-header">
              <h4 className="modal-title">Add New DVD</h4>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="exampleInputName">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputName"
                  placeholder="Name"
                  name="name"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputCategory">Category</label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputCategory"
                  placeholder="Category"
                  name="category"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputImage">Image URL</label>
                <textarea
                  className="form-control"
                  id="exampleInputImage"
                  placeholder="Url"
                  name="image"
                  required
                ></textarea>
              </div>
              <div className="form-group form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="Featured"
                  name="featured"
                />
                <label className="form-check-label" htmlFor="Featured">
                  Featured
                </label>
              </div>
            </div>
            <div className="modal-footer">
              <input type="submit" className="btn btn-primary" name="Save" />
              <button
                type="button"
                id="closeButton"
                className="btn btn-default"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
