import React, { useEffect, useState } from "react";
import { Button, Checkbox, Input, Spin, notification } from "antd";
import { LoadingOutlined, SmileOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { ROLE_UPDATE } from "../../api/api";
import SisLoader from "../../widgets/loader";

function EditRole() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loader, set_loader] = useState(false);
  const [errors, set_errors] = useState({});
  const [access_level, set_access_level] = useState("");
  const [description, set_description] = useState("");
  const [permission, set_permission] = useState([
    {
      slug: "inventry_panel",
      title: "INVENTRY PANEL",
      view: false,
      create: false,
      update: false,
      status: false,
      soft_delete: false,
    },
    {
      slug: "invoive_panel",
      title: "INVOICE PANEL",
      view: false,
      create: false,
      update: false,
      status: false,
      soft_delete: false,
    },
    {
      slug: "accounting_panel",
      title: "ACCOUNTING PANEL",
      view: false,
      create: false,
      update: false,
      status: false,
      soft_delete: false,
    },
  ]);
  const [page_loader, set_page_loader] = useState(false);

  const VIEW_API = async () => {
    set_page_loader(true);
    try {
      const VIEW_ROLE_API_RESPONSE = await ROLE_UPDATE({ id });
      if (VIEW_ROLE_API_RESPONSE?.data?.status) {
        const user_permissions_data = VIEW_ROLE_API_RESPONSE?.data?.newData;
        set_access_level(user_permissions_data.title);
        set_description(user_permissions_data.description);
        const formattedPermissions = user_permissions_data.permissions.map((perm) => ({
          slug: perm.slug,
          title: perm.title,
          view: perm.view,
          create: perm.create,
          update: perm.update, 
          status: perm.status,
          soft_delete: perm.delete, 
        }));
        set_permission(formattedPermissions);
        set_page_loader(false);
        set_errors([]);
      } else {
        set_errors(VIEW_ROLE_API_RESPONSE?.data?.errors);
        set_page_loader(false);
      }
    } catch (error) {
      console.error("Error fetching role data:", error);
      set_page_loader(false);
    }
  };

  useEffect(() => {
    VIEW_API();
  }, [id]);

  const update_permissions = (e, name, type) => {
    const new_permissions = permission.map((perm) => {
      if (perm.slug === name) {
        return { ...perm, [type]: e.target.checked };
      }
      return perm;
    });
    set_permission(new_permissions);
  };

  const EditRoleAPi = async () => {
    try {
      set_loader(true);
      const FORM_DATA = new FormData();
      FORM_DATA.append("title", access_level);
      FORM_DATA.append("description", description);
      FORM_DATA.append("permissions", JSON.stringify(permission));
      const UPDATE_ROLE_API_RESPONSE = await ROLE_UPDATE({ id, ...FORM_DATA });
      if (UPDATE_ROLE_API_RESPONSE?.data?.status) {
        notification.open({
          message: "Success!!",
          description: "Role Successfully Updated.",
          icon: <SmileOutlined style={{ color: "green" }} />,
        });
        navigate("/Dashboard/new-role-view");
      } else {
        set_errors(UPDATE_ROLE_API_RESPONSE?.data?.errors);
        set_loader(false);
      }
    } catch (error) {
      console.error("Error updating role:", error);
      set_loader(false);
    }
  };

  return (
    <>
      <div className="white-container">
        <div className="theme-content-left-head">
          <h3> Edit Role </h3>
        </div>
        <div className="row">
          <div className="col-6">
            <div className="input-box">
              <label>
                Access Level <i style={{ color: "red" }}>*</i>
              </label>
              <Input
                placeholder="Access Level"
                value={access_level}
                onChange={(e) => set_access_level(e.target.value)}
              />
              {errors?.title && <span style={{ color: "red" }}>{errors?.title}</span>}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <div className="input-box">
              <label htmlFor="title">
                Role Description<i style={{ color: "red" }}>*</i>
              </label>
              <Input.TextArea
                placeholder="Role Description"
                id="description"
                value={description}
                onChange={(e) => set_description(e.target.value)}
              />
              {errors?.description && <span style={{ color: "red" }}>{errors?.description}</span>}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <h2>Access Permissions</h2>
            {page_loader ? (
              <SisLoader />
            ) : (
              <div className="row" style={{ marginTop: "0" }}>
                {permission.map((item) => (
                  <div className="col-3" key={item.slug}>
                    <h4
                      style={{
                        marginBottom: "10px",
                        marginTop: "10px",
                        textTransform: "uppercase",
                      }}
                    >
                      {item.title}
                    </h4>
                    <Checkbox
                      checked={item.view}
                      onChange={(e) => update_permissions(e, item.slug, "view")}
                    >
                      View
                    </Checkbox>
                    <br />
                    <Checkbox
                      checked={item.create}
                      onChange={(e) => update_permissions(e, item.slug, "create")}
                    >
                      Create
                    </Checkbox>
                    <br />
                    <Checkbox
                      checked={item.update}
                      onChange={(e) => update_permissions(e, item.slug, "update")}
                    >
                      Update
                    </Checkbox>
                    <br />
                    <Checkbox
                      checked={item.status}
                      onChange={(e) => update_permissions(e, item.slug, "status")}
                    >
                      Status
                    </Checkbox>
                    <br />
                    <Checkbox
                      checked={item.delete}
                      onChange={(e) => update_permissions(e, item.slug, "delete")}
                    >
                      Soft Delete
                    </Checkbox>
                  </div>
                ))}
              </div>
            )}
            <div className="input-box" style={{ marginTop: "15px" }}>
              {loader ? (
                <Button type="primary">
                  <Spin
                    indicator={<LoadingOutlined style={{ fontSize: "12px", color: "#fff", marginRight: "5px" }} />}
                  />
                  Save
                </Button>
              ) : (
                <Button type="primary" onClick={EditRoleAPi}>Save</Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditRole;


