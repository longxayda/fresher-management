import React, { useState } from "react";
import CreateClass from "components/CreateClass";
import ListClass from "components/ListClass";
function ManageClass() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="container-fluid">
        {open && <CreateClass open={open} setOpen={setOpen} />}
        <ListClass setOpen={setOpen} />
      </div>
    </>
  );
}

export default ManageClass;
