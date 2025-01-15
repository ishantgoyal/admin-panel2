import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './login/login';
import SisLayout from './pages/layout';
import { ConfigProvider } from 'antd';
import Registration from './company_registration/sign-up';
import Dashboard from './pages/dashboard';
import ViewInventryList from './pages/inventryPanel/list';
import AddUser from './pages/users/addUser';
import UsersList from './pages/users/usersList';
import RoleList from './pages/roles/roleList';
import AddRole from './pages/roles/addRole';
import EditRole from './pages/roles/editRole';
import EditUser from './pages/users/editUser';
import InventryAdd from './pages/inventryPanel/add';
import InventryUpdate from './pages/inventryPanel/update';
import ViewListReport from './pages/inventryPanel/inventryReport/viewListReport';
import AddExpense from './pages/accountingPanel/add';
import ViewExpenseList from './pages/accountingPanel/list';
import ExpenseUpdate from './pages/accountingPanel/edit';
import ViewAccountingListReport from './pages/accountingPanel/accountingReports/viewAccountingReports';
import InvoiceAdd from './pages/invoicePanel/add';
import ViewInvoiceList from './pages/invoicePanel/list';
import InvoiceUpdate from './pages/invoicePanel/update';

function App() {
  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#DFA414",
          },
        }}
      >
        <BrowserRouter>
          <Routes>
            <Route path="/Dashboard" element={<SisLayout />}>
              <Route index element={<Dashboard />} />

              {/* role Route  */}

              <Route path="new-role-add" element={< AddRole />} />
              <Route path="update-role/:id" element={< EditRole />} />
              <Route path="new-role-view" element={< RoleList />} />

              {/* user Route  */}

              <Route path="new-user-add" element={<AddUser />} />
              <Route path="update-user/:id" element={< EditUser />} />
              <Route path="new-user-view" element={< UsersList />} />

              {/* inventry Route */}

              <Route path="new-inventry-add" element={<InventryAdd />} />
              <Route path="update-inventry/:id" element={< InventryUpdate />} />
              <Route path="inventry-list-view" element={<ViewInventryList />} />
              <Route path="inventry-list-report-view" element={<ViewListReport />} />

              {/* Accounting Route */}

              <Route path="new-expense-add" element={<AddExpense />} />
              <Route path="update-expense/:id" element={< ExpenseUpdate />} />
              <Route path="expense-list-view" element={<ViewExpenseList />} />
              <Route path="expense-list-report-view" element={<ViewAccountingListReport />} />

              {/* Invoice Route */}

              <Route path="new-invoice-add" element={<InvoiceAdd />} />
               <Route path="update-invoice/:id" element={< InvoiceUpdate />} />
              <Route path="invoice-list-view" element={<ViewInvoiceList />} />
              {/* <Route path="invoice-list-report-view" element={<ViewAccountingListReport />} /> */}

            </Route>


            {/* Other Routes */}

            <Route path="/" element={<Login />} />
            <Route path="/registration" element={<Registration />} />
          </Routes>
        </BrowserRouter>
      </ConfigProvider>
    </>
  );
}

export default App;

