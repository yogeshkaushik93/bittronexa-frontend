import { Route, Routes } from "react-router-dom";
import { AuthenticatedRoutes } from "../../constants/Routes";
import UserMain from "../website/UserMain";
import DashboardMain from "../DashboardMain";
import UserHome from "../user/UserHome";
import ProfilePage from "../user/ProfilePage";
import Withdrawal from "../user/Withdrawal";
import WithdrawalReport from "../user/WithdrawalReport";
import OverallUserCustomPlan from "../user/OverallUserCustomPlan";
import TeamTree from "../user/TeamTree";
import AdminDashboard from "../admin/AdminDashboard";
import PaymentAproval from "../admin/PaymentAproval";
import BankDetails from "../user/BankDetails";
import FundRequestForm from "../user/FundRequestForm";
import FundTransferForm from "../user/FundTransferForm";
import FundRequestReport from "../user/FundRequestReport";
import FundTransferReport from "../user/FundTransferReport";
import DirectTeamLists from "../user/DirectTeamLists";
import FundAproval from "../admin/FundAproval";
import ReferralIncomeReports from "../user/income-pages/ReferralIncomeReports";
import SpinIncomeReports from "../user/income-pages/SpinIncomeReports";
import LevelIncomeReports from "../user/income-pages/LevelIncomeReports";
import RoyaltyIncomeReports from "../user/income-pages/RoyaltyIncomeReports";
import SelfIncomeReports from "../user/income-pages/SelfIncomeReports";
import PendingWithdrawalRequest from "../admin/PendingWithdrawalRequest";
import FundRecieveReport from "../user/FundRecieveReport";
import CompleteWithdrawalRequest from "../admin/CompleteWithdrawalRequest";
import RejectWithdrawalRequest from "../admin/RejectWithdrawalRequest";
import CompleteFundRequest from "../admin/CompleteFundRequest";
import RejectFundRequest from "../admin/RejectFundRequest";
import CompletePlanRequest from "../admin/CompletePlanRequest";
import RejectPlanRequest from "../admin/RejectPlanRequest";
import ComplainRaiseTicket from "../user/ComplainRaiseTicket";
import ComplainTicketHistory from "../user/ComplainTicketHistory";
import ComplainTicketList from "../admin/ComplainTicketList";
import AllUsersList from "../admin/AllUsersList";
import PurchasePlanHistory from "../user/PurchasePlanHistory";
import DirectReferralIncome from "../user/DirectReferralIncome";
import MatchingIncomeReports from "../user/income-pages/MatchingIncomeReports";
import AdminMatchingIncomeReports from "../admin/income-pages/AdminMatchingIncomeReports";
import AdminLevelIncomeReports from "../admin/income-pages/AdminLevelIncomeReports";
import AdminSelfIncomeReports from "../admin/income-pages/AdminSelfIncomeReports";
import AdminDirectReferralIncomeReports from "../admin/income-pages/AdminDirectReferralIncomeReports";
import AllPurchasePackageList from "../admin/AllPurchasePackageList";
import NewsandNotifs from "../admin/NewsandNotifs";
import Notification from "../user/Notification";
import WithdrawalUpdate from "../admin/WithdrawalUpdate";
import RoiIncomeReport from "../user/income-pages/RoiIncomeHistory";
import ActiveUsers from "../admin/ActiveUsers";
import DirectRefferalIncomeHistory from "../user/income-pages/DirectRefferalIncomeHistory";
import TransactionLimit from "../admin/TransactionLimit";
import MinMaxLimit from "../admin/MinMaxLimit";
import MinPackageAmount from "../admin/MinPackageAmount";
import EmailRegistration from "../user/EmailRegistration";
import WithdrawalBlockList from "../admin/WithdrawalBlockList";
import UserTransactionLimit from "../admin/UserTransactionLimit";
import Profile from "../user/BotxUserPanel/Profile";
import ServicePackage from "../user/BotxUserPanel/ServicePackage";
import Miningpackage from "../user/BotxUserPanel/Miningpackage";
import AllTeam from "../user/BotxUserPanel/AllTeam";
import WithdrawalPackage from "../user/BotxUserPanel/MakeInvestment";
import ClubIncome from "../user/BotxUserPanel/incomePages/ClubIncome";
import MatchingIncome from "../user/BotxUserPanel/incomePages/MatchingIncome";
import ServiceGenration from "../user/BotxUserPanel/incomePages/ServiceGenration";
import RewardIncome from "../user/BotxUserPanel/incomePages/RewardIncome";
import DepositFund from "../user/BotxUserPanel/Deposit/DepositFund";
import DepositeInvoice from "../user/BotxUserPanel/Deposit/DepositeInvoice";
import RankAndReward from "../user/BotxUserPanel/RankAndReward";
import FundTransfer from "../user/BotxUserPanel/Transfer/FundTransfer";
import FundRecive from "../user/BotxUserPanel/Transfer/FundRecive";
import FundTransferReportbot from "../user/BotxUserPanel/Transfer/FundTransferReportbot";
import WIthDrawFundReport from "../user/BotxUserPanel/FInancial/WIthDrawFundReport";
import WithDrawFund from "../user/BotxUserPanel/FInancial/WithDrawFund";
import AccountStatement from "../user/BotxUserPanel/FInancial/AccountStatement";
import IncomeSummary from "../user/BotxUserPanel/FInancial/IncomeSummary";
import MakeInvestment from "../user/BotxUserPanel/MakeInvestment";
import ServicePackageBuyerHistory from "../admin/BotxAdmin/ServicePackageBuyerHistory";
import TopupUser from "../admin/BotxAdmin/TopupUser";
import MatchingIncomeReport from "../admin/BotxAdmin/MatchingIncomeReport";
import RankReward from "../admin/BotxAdmin/RankReward";
import ClubIncomeReport from "../admin/BotxAdmin/ClubIncomeReport";
import InvestmentHistory from "../user/BotxUserPanel/InvestmentHistory";
import EditProfile from "../admin/BotxAdmin/EditProfile";
import P2PHistory from "../admin/BotxAdmin/P2PHistory";
import NestedTeam from "../user/BotxUserPanel/NestedTeam";
import TopupPackageWallet from "../admin/BotxAdmin/TopupPackageWallet";
import TopupPackageWalletHistory from "../admin/BotxAdmin/TopupPackageWalletHistory";
import UserPackageWalletHistory from "../user/BotxUserPanel/UserPackageWalletHistory";
import Swap from "../user/BotxUserPanel/Swap/Swap";
import SwapHistory from "../user/BotxUserPanel/Swap/SwapHistory";
import AchievmentIncome from "../../components/bittronexapages/AchievmentIncome";
import ActivateBot from "../../components/bittronexapages/ActivateBot";
import BotPackages from "../../components/bittronexapages/BotPackages";
import IBIncome from "../../components/bittronexapages/IBIncome";
import LearderShipAndRankReward from "../../components/bittronexapages/LearderShipAndRankReward";
import RewarIncome from "../../components/bittronexapages/RewarIncome";
import TopupMainWallet from "../../components/bittronexapages/TopupMainWallet";
import TradingLevelIncome from "../../components/bittronexapages/TradingLevelIncome";
import TradingProfit from "../../components/bittronexapages/TradingProfit";
import PackageSettings from "../../components/bittronexapages/PackageSettings";
import GenrationDistribution from "../../components/bittronexapages/GenrationDistribution";
import LeaderShipRankRewardDetails from "../../components/bittronexapages/LeaderShipRankRewardDetails";
import BotOrders from "../../components/bittronexapages/BotOrders";
import BotSettings from "../../components/bittronexapages/BotSettings";
import BulkRegister from "../../components/bittronexapages/BulkRegister";
import SetupTransactionPassword from "../../components/bittronexapages/SetupTransactionPassword";
import FastTrackIncome from "../../components/bittronexapages/FastTrackIncome";
import ServicePacage from "../admin/BotxAdmin/ServicePacage";
import AddInvestmentToUser from "../user/BotxUserPanel/Transfer/AddInvestmentToUser";
import ForgotPassword from "../../components/ui/ForgotPassword";
import ServicelevelncomeHisotry from "../admin/income-pages/ServicelevelncomeHisotry";
import AdminIbIncomeHistory from "../admin/income-pages/AdminIbIncomeHistory";
import AdminFastTrackHistory from "../admin/income-pages/AdminFastTrackHistory";
import Totalteams from "../user/BotxUserPanel/Totalteams";
import PinId from "../admin/BotxAdmin/PinId";
import AddMatching from "../admin/BotxAdmin/AddMatching";
import ActivateUserId from "../user/BotxUserPanel/ActivateUserId";
import Invoice from "../../components/bittronexapages/Invoice";
import BusinessPlanHistory from "../../components/bittronexapages/BusinessPlanHistory";
import DeductFund from "../../components/bittronexapages/DeductFund";
import DeductHistoryByAdmin from "../../screens/admin/BotxAdmin/DeductHistoryByAdmin";
import AdminDeductFundHistory from "../../screens/admin/BotxAdmin/AdminDeductFundHistory";
import Persentation from "../admin/BotxAdmin/Persentation";
import ServicePackageActivationHistory from "../../components/bittronexapages/ServicePackageActivationHistory";
import PrincipleWithdrwalReport from "../../components/bittronexapages/PrincipleWithdrwalReport";
import AddInvestmentHistory from "../admin/income-pages/AddInvestmentHistory";
import OtherServicePackageActivationtHistory from "../../components/bittronexapages/OtherServicePackageActivationtHistory";
import MonthlyClosingReport from "../../components/bittronexapages/MonthlyClosingReport";
import PortFolio from "../admin/income-pages/PortFolio";
import AddBotBusiness from "../../components/bittronexapages/AddBotBusiness";
import AddFundBusiness from "../../components/bittronexapages/AddFundBusiness";
import MaintenanceMode from "../admin/MaintenanceMode";
import DeductInvestment from "../admin/DeductInvestment";
import Deposit from "../user/Deposit";
const Authenticate = () => {
  const role = localStorage.getItem("role");
  return (
    <>
      <Routes>
        {role === "Admin" ? (
          <>
            <Route
              path={"*"}
              element={
                <DashboardMain inner={<AdminDashboard />} name="Dashboard" />
              }
            />
            <Route
              path={AuthenticatedRoutes.APPROVED_WITHDRAWAL_REQUEST}
              element={
                <DashboardMain
                  inner={<CompleteWithdrawalRequest />}
                  name="Complete Withdrawal Request"
                />
              }
            />
            <Route
              path={AuthenticatedRoutes.TRANSACTION_LIMIT}
              element={
                <DashboardMain
                  inner={<TransactionLimit />}
                  name="Transaction Limit"
                />
              }
            />
            <Route
              path={AuthenticatedRoutes.MIN_MAX_LIMIT}
              element={
                <DashboardMain
                  inner={<MinMaxLimit />}
                  name="Transaction Limit"
                />
              }
            />
            <Route
              path={AuthenticatedRoutes.RANK_REWARD}
              element={
                <DashboardMain
                  inner={<RankReward />}
                  name="Rank Reward Report"
                />
              }
            />
            <Route
              path={AuthenticatedRoutes.ADMIN_IB_INCOME_HISTORY}
              element={
                <DashboardMain
                  inner={<AdminIbIncomeHistory />}
                  name="IB Income History"
                />
              }
            />
            <Route
              path={AuthenticatedRoutes.ADMIN_FAST_TRACK_HISTORY}
              element={
                <DashboardMain
                  inner={<AdminFastTrackHistory />}
                  name="Fast Track Income History"
                />
              }
            />
            <Route
              path={AuthenticatedRoutes.PRINCIPLE_WITHDRAW_REPORT}
              element={
                <DashboardMain
                  inner={<PrincipleWithdrwalReport />}
                  name="Principle Withdraw Report"
                />
              }
            />
            <Route
              path={AuthenticatedRoutes.CLUB_INCOME_HISTORY}
              element={
                <DashboardMain
                  inner={<ClubIncomeReport />}
                  name="Club Income History"
                />
              }
            />
            <Route
              path={AuthenticatedRoutes.TOPUP_USERS}
              element={
                <DashboardMain inner={<TopupUser />} name="Topup Users" />
              }
            />
            <Route
              path={AuthenticatedRoutes.TOPUP_PACKAGE_WALLET}
              element={
                <DashboardMain
                  inner={<TopupPackageWallet />}
                  name="Add Fund to Package Wallet"
                />
              }
            />
            <Route
              path={AuthenticatedRoutes.TOPUP_PACKAGE_WALLET_HISTORY}
              element={
                <DashboardMain
                  inner={<TopupPackageWalletHistory />}
                  name="Topup Package Wallet History"
                />
              }
            />
            <Route
              path={AuthenticatedRoutes.MATCHING_INCOME_REPORT_BOTX}
              element={
                <DashboardMain
                  inner={<MatchingIncomeReport />}
                  name="Matching Income Report"
                />
              }
            />
            <Route
              path={AuthenticatedRoutes.SERVICE_PACKAGE_HISTORY}
              element={
                <DashboardMain
                  inner={<ServicePackageBuyerHistory />}
                  name="Service Package Buyer History "
                />
              }
            />
            <Route
              path={AuthenticatedRoutes.MIN_PACKAGE_AMOUNT}
              element={
                <DashboardMain
                  inner={<MinPackageAmount />}
                  name="Min Package Amount"
                />
              }
            />
            <Route
              path={AuthenticatedRoutes.ADMIN_DASHBOARD}
              element={
                <DashboardMain inner={<AdminDashboard />} name="Dashboard" />
              }
            />

            <Route
              path={AuthenticatedRoutes.RAISE_TICKET_LIST}
              element={
                <DashboardMain
                  inner={<ComplainTicketList />}
                  name="Raise Ticket History"
                />
              }
            />
            <Route
              path={AuthenticatedRoutes.ALL_USERS}
              element={
                <DashboardMain inner={<AllUsersList />} name="All Users List" />
              }
            />
            <Route
              path={AuthenticatedRoutes.ACTIVE_USERS}
              element={
                <DashboardMain inner={<ActiveUsers />} name="Active Users" />
              }
            />
            <Route
              path={AuthenticatedRoutes.LEVEL_INCOME_REPORT}
              element={
                <DashboardMain
                  inner={<AdminLevelIncomeReports />}
                  name="Trade Level Income History"
                />
              }
            />

            <Route
              path={AuthenticatedRoutes.SERVICE_LEVEL_INCOME_REPORT}
              element={
                <DashboardMain
                  inner={<ServicelevelncomeHisotry />}
                  name="Service Level Income History"
                />
              }
            />
            <Route
              path={AuthenticatedRoutes.SELF_INCOME_REPORT}
              element={
                <DashboardMain
                  inner={<AdminSelfIncomeReports />}
                  name="Self Income History"
                />
              }
            />
            <Route
              path={AuthenticatedRoutes.DIRECT_REFERRAL_INCOME_REPORT}
              element={
                <DashboardMain
                  inner={<DirectRefferalIncomeHistory />}
                  name="Direct Referral Income History"
                />
              }
            />
            <Route
              path={AuthenticatedRoutes.ROI_INCOME_HISTORY}
              element={
                <DashboardMain
                  inner={<AdminMatchingIncomeReports />}
                  name="Trade Income History"
                />
              }
            />
            <Route
              path={AuthenticatedRoutes.DIRECT_REFERRAL_INCOME_REPORT}
              element={
                <DashboardMain
                  inner={<AdminDirectReferralIncomeReports />}
                  name="Airdrop Income History"
                />
              }
            />
            <Route
              path={AuthenticatedRoutes.PURCHASE_PLAN_HISTORY}
              element={
                <DashboardMain
                  inner={<AllPurchasePackageList />}
                  name="All Purchase Package List"
                />
              }
            />
            <Route
              path={AuthenticatedRoutes.NEWS_AND_NOTIF_ADMIN}
              element={
                <DashboardMain
                  inner={<NewsandNotifs />}
                  name="Content Management "
                />
              }
            />
            <Route
              path={AuthenticatedRoutes.WITHDRAWAL_UPDATE}
              element={
                <DashboardMain
                  inner={<WithdrawalUpdate />}
                  name="Withdrawal Details Update"
                />
              }
            />
            <Route
              path={AuthenticatedRoutes.WITHDRAWAL_BLOCK}
              element={
                <DashboardMain
                  inner={<WithdrawalBlockList />}
                  name="Withdrawal Block List "
                />
              }
            />
            <Route
              path={AuthenticatedRoutes.USER_TRANSACTION_LIMIT}
              element={
                <DashboardMain
                  inner={<UserTransactionLimit />}
                  name="Withdrawal Block List "
                />
              }
            />
            <Route
              path={AuthenticatedRoutes.P2P_HISTORY}
              element={
                <DashboardMain inner={<P2PHistory />} name="P2P History" />
              }
            />
            <Route
              path={AuthenticatedRoutes.EIDT_PROFILE_ADMIN}
              element={
                <DashboardMain inner={<EditProfile />} name="Edit Profile" />
              }
            />
            <Route
              path={AuthenticatedRoutes.PENDING_WITHDRAWAL_REQUEST}
              element={
                <DashboardMain
                  inner={<PendingWithdrawalRequest />}
                  name="Pending Withdrawals"
                />
              }
            />
            <Route
              path={AuthenticatedRoutes.PACKAGE_SETTINGS}
              element={
                <DashboardMain
                  inner={<PackageSettings />}
                  name="Package Settings"
                />
              }
            />
            <Route
              path={AuthenticatedRoutes.SUBSCRIPTION_PACKAGES}
              element={
                <DashboardMain
                  inner={<PackageSettings />}
                  name="Subscription Packages"
                />
              }
            />
            <Route
              path={AuthenticatedRoutes.GENRATION_DISTRIBUTION}
              element={
                <DashboardMain
                  inner={<GenrationDistribution />}
                  name="Genrational Distribution"
                />
              }
            />
            <Route
              path={AuthenticatedRoutes.LEADERSHIP_RANK_REWARD_DETAILS}
              element={
                <DashboardMain
                  inner={<LeaderShipRankRewardDetails />}
                  name="Leadership Rank Reward "
                />
              }
            />
            <Route
              path={AuthenticatedRoutes.BOT_ORDERS}
              element={
                <DashboardMain inner={<BotOrders />} name="Bot Orders" />
              }
            />
            <Route
              path={AuthenticatedRoutes.BOT_SETTINGS}
              element={
                <DashboardMain inner={<BotSettings />} name="Bot Settings" />
              }
            />
            <Route
              path={AuthenticatedRoutes.BULK_REGISTER}
              element={
                <DashboardMain inner={<BulkRegister />} name="Bulk Register" />
              }
            />
            <Route
              path={AuthenticatedRoutes.ADD_MATCHING}
              element={
                <DashboardMain inner={<AddMatching />} name="Add Matching" />
              }
            />
            <Route
              path={AuthenticatedRoutes.PIN_ID}
              element={<DashboardMain inner={<PinId />} name="Pin ID" />}
            />
            <Route
              path={AuthenticatedRoutes.DEDUCT_FUND}
              element={
                <DashboardMain inner={<DeductFund />} name="Deduct Fund" />
              }
            />
            <Route
              path={AuthenticatedRoutes.ADMIN_DEDUCT_FUND_HISTORY}
              element={
                <DashboardMain
                  inner={<AdminDeductFundHistory />}
                  name="Deduct Fund History"
                />
              }
            />
            <Route
              path={AuthenticatedRoutes.ADD_BOT_BUSINESS}
              element={
                <DashboardMain
                  inner={<AddBotBusiness />}
                  name="Add Virtual Team"
                />
              }
            />
            <Route
              path={AuthenticatedRoutes.ADD_FUND_BUSINESS}
              element={
                <DashboardMain
                  inner={<AddFundBusiness />}
                  name="Add Fund Business"
                />
              }
            />
            <Route
              path={AuthenticatedRoutes.MAINTENANCE_MODE}
              element={
                <DashboardMain
                  inner={<MaintenanceMode />}
                  name="Maintenance Mode"
                />
              }
            />
            <Route
              path={AuthenticatedRoutes.DEDUCT_INVESTMENT}
              element={
                <DashboardMain
                  inner={<DeductInvestment />}
                  name="Deduct Investment"
                />
              }
            />
          </>
        ) : (
          <>
            <Route
              path={AuthenticatedRoutes.USER_HOME}
              element={<UserMain />}
            />
            <Route
              path={AuthenticatedRoutes.USER_DASHBOARD}
              element={<DashboardMain inner={<UserHome />} name="Dashboard" />}
            />
            <Route path="*" element={<UserMain />} />
            <Route
              path={AuthenticatedRoutes.USER_PROFILE}
              element={<DashboardMain inner={<ProfilePage />} name="Profile" />}
            />
            <Route
              path={AuthenticatedRoutes.BANK_DETAILS}
              element={
                <DashboardMain inner={<BankDetails />} name="Bank Detail" />
              }
            />
            <Route
              path={AuthenticatedRoutes.REFERRAL_INCOME_REPORT}
              element={
                <DashboardMain
                  inner={<ReferralIncomeReports />}
                  name="Referral Income Report"
                />
              }
            />
            <Route
              path={AuthenticatedRoutes.PERSENTATION}
              element={
                <DashboardMain
                  inner={<Persentation />}
                  name="View Presentation"
                />
              }
            />
            <Route
              path={AuthenticatedRoutes.EMAIL_REGISTRATION}
              element={
                <DashboardMain
                  inner={<EmailRegistration />}
                  name="Email Registration"
                />
              }
            />

            <Route
              path={AuthenticatedRoutes.ALL_TEAM_NETWORK}
              element={<DashboardMain inner={<Totalteams />} name="All Team" />}
            />
            <Route
              path={AuthenticatedRoutes.ROI_INCOME_REPORT}
              element={
                <DashboardMain
                  inner={<RoiIncomeReport />}
                  name="Trading Profit Report"
                />
              }
            />
            <Route
              path={AuthenticatedRoutes.SPIN_INCOME_REPORT}
              element={
                <DashboardMain
                  inner={<SpinIncomeReports />}
                  name="Spin Income Report"
                />
              }
            />
            <Route
              path={AuthenticatedRoutes.LEVEL_INCOME_REPORT}
              element={
                <DashboardMain
                  inner={<LevelIncomeReports />}
                  name="Level Income Report"
                />
              }
            />
            <Route
              path={AuthenticatedRoutes.MATCHING_INCOME_REPORT}
              element={
                <DashboardMain
                  inner={<MatchingIncomeReports />}
                  name="Matching Income Report"
                />
              }
            />
            <Route
              path={AuthenticatedRoutes.DIRECT_REFERRAL_INCOME_REPORT}
              element={
                <DashboardMain
                  inner={<DirectReferralIncome />}
                  name="Airdrop Income Report"
                />
              }
            />
            <Route
              path={AuthenticatedRoutes.DEPOSIT_USDT}
              element={
                <DashboardMain inner={<Deposit />} name="Deposit USDT" />
              }
            />
            <Route
              path={AuthenticatedRoutes.ROYALTY_INCOME_REPORT}
              element={
                <DashboardMain
                  inner={<RoyaltyIncomeReports />}
                  name="Royalty Income Report"
                />
              }
            />
            <Route
              path={AuthenticatedRoutes.SELF_INCOME_REPORT}
              element={
                <DashboardMain
                  inner={<SelfIncomeReports />}
                  name="Self Income Report"
                />
              }
            />
            <Route
              path={AuthenticatedRoutes.TEAM_TREE}
              element={<DashboardMain inner={<TeamTree />} name="Team Tree" />}
            />
            <Route
              path={AuthenticatedRoutes.NESTED_TEAM}
              element={
                <DashboardMain inner={<NestedTeam />} name="Nested Team" />
              }
            />
            <Route
              path={AuthenticatedRoutes.WALLET}
              element={<DashboardMain inner={<Withdrawal />} name="Wallet" />}
            />
            <Route
              path={AuthenticatedRoutes.WITHDRAWAL_REPORT}
              element={
                <DashboardMain
                  inner={<WithdrawalReport />}
                  name="Withdrawal Report"
                />
              }
            />
            <Route
              path={AuthenticatedRoutes.PURCHASE_PLAN_HISTORY}
              element={
                <DashboardMain
                  inner={<PurchasePlanHistory />}
                  name="Purchase History"
                />
              }
            />
            <Route
              path={AuthenticatedRoutes.OUR_PLANS}
              element={
                <DashboardMain
                  inner={<OverallUserCustomPlan />}
                  name="Our Plan"
                />
              }
            />

            <Route
              path={AuthenticatedRoutes.FUND_REQUEST}
              element={
                <DashboardMain
                  inner={<FundRequestForm />}
                  name="Fund Request"
                />
              }
            />
            <Route
              path={AuthenticatedRoutes.FUND_TRANSFER}
              element={
                <DashboardMain
                  inner={<FundTransferForm />}
                  name="Fund Transfer"
                />
              }
            />
            <Route
              path={AuthenticatedRoutes.FUND_REQUEST_HISTORY}
              element={
                <DashboardMain
                  inner={<FundRequestReport />}
                  name="Fund Request History"
                />
              }
            />
            <Route
              path={AuthenticatedRoutes.FUND_TRANSFER_HISTORY}
              element={
                <DashboardMain
                  inner={<FundTransferReport />}
                  name="Fund Transfer History"
                />
              }
            />
            <Route
              path={AuthenticatedRoutes.FUND_RECEIVE_HISTORY}
              element={
                <DashboardMain
                  inner={<FundRecieveReport />}
                  name="Fund Receive History"
                />
              }
            />
            <Route
              path={AuthenticatedRoutes.TEAM_DIRECT}
              element={
                <DashboardMain inner={<DirectTeamLists />} name="Direct Team" />
              }
            />
            <Route
              path={AuthenticatedRoutes.SUPPORT_RAISE_TICKET}
              element={
                <DashboardMain
                  inner={<ComplainRaiseTicket />}
                  name="Raise Ticket"
                />
              }
            />
            <Route
              path={AuthenticatedRoutes.SUPPORT_RAISE_TICKET_HISTORY}
              element={
                <DashboardMain
                  inner={<ComplainTicketHistory />}
                  name="Raise Ticket"
                />
              }
            />
            <Route
              path={AuthenticatedRoutes.NEWS_AND_NOTIF}
              element={
                <DashboardMain
                  inner={<Notification />}
                  name="Notification & Announcements "
                />
              }
            />

            {/* botxroutes here  */}

            <Route
              path={AuthenticatedRoutes.PROFILE}
              element={<DashboardMain inner={<Profile />} name="Profile " />}
            />

            <Route
              path={AuthenticatedRoutes.SERVICE_PACKAGES}
              element={
                <DashboardMain
                  inner={<ServicePackage />}
                  name="Service Package "
                />
              }
            />
            <Route
              path={AuthenticatedRoutes.MINING_PACKAGES}
              element={
                <DashboardMain
                  inner={<Miningpackage />}
                  name="Mining Package "
                />
              }
            />
            <Route
              path={AuthenticatedRoutes.MAKE_INVESTMENT}
              element={
                <DashboardMain
                  inner={<MakeInvestment />}
                  name="Make Investment "
                />
              }
            />
            <Route
              path={AuthenticatedRoutes.WITHDRAW_PACKAGE}
              element={
                <DashboardMain
                  inner={<Miningpackage />}
                  name="Withdraw Package "
                />
              }
            />
            <Route
              path={AuthenticatedRoutes.ALL_TEAM}
              element={<DashboardMain inner={<AllTeam />} name="All Team" />}
            />
            <Route
              path={AuthenticatedRoutes.INVESTMENT_HISTORY}
              element={
                <DashboardMain
                  inner={<InvestmentHistory />}
                  name="Investment History"
                />
              }
            />
            <Route
              path={AuthenticatedRoutes.USER_PACKAGE_WALLET_HISTORY}
              element={
                <DashboardMain
                  inner={<UserPackageWalletHistory />}
                  name="Topup Package Wallet History"
                />
              }
            />
            <Route
              path={AuthenticatedRoutes.CLUB_INCOME}
              element={
                <DashboardMain inner={<ClubIncome />} name="Club income " />
              }
            />
            <Route
              path={AuthenticatedRoutes.MATCHING_INCOME}
              element={
                <DashboardMain
                  inner={<MatchingIncome />}
                  name="Matching income "
                />
              }
            />
            <Route
              path={AuthenticatedRoutes.SERVICE_GENRATION}
              element={
                <DashboardMain
                  inner={<ServiceGenration />}
                  name="Service Genration "
                />
              }
            />
            <Route
              path={AuthenticatedRoutes.REWARD_iNCOME}
              element={
                <DashboardMain inner={<RewardIncome />} name="Reward Income " />
              }
            />
            <Route
              path={AuthenticatedRoutes.DEPOSIT_FUND}
              element={
                <DashboardMain inner={<DepositFund />} name="Deposit Fund " />
              }
            />
            <Route
              path={AuthenticatedRoutes.DEPOSIT_FUND_INVOICE}
              element={
                <DashboardMain
                  inner={<DepositeInvoice />}
                  name="Deposit Fund Invoice"
                />
              }
            />
            <Route
              path={AuthenticatedRoutes.RANK_AND_REWARD}
              element={
                <DashboardMain
                  inner={<RankAndReward />}
                  name="Rank And Reward "
                />
              }
            />

            <Route
              path={AuthenticatedRoutes.TRANSFER_FUND}
              element={
                <DashboardMain inner={<FundTransfer />} name="P2P Transfer" />
              }
            />
            <Route
              path={AuthenticatedRoutes.TRANSACTION_PASS}
              element={
                <DashboardMain
                  inner={<SetupTransactionPassword />}
                  name="Setup Transaction Password"
                />
              }
            />
            <Route
              path={AuthenticatedRoutes.TRANSFER_FUND_REPORT}
              element={
                <DashboardMain
                  inner={<FundTransferReportbot />}
                  name="P2P Transfer Report "
                />
              }
            />
            <Route
              path={AuthenticatedRoutes.FUND_RECIVE}
              element={
                <DashboardMain inner={<FundRecive />} name="Fund Recieve " />
              }
            />
            <Route
              path={AuthenticatedRoutes.WITHDRAW_FUND_BOT}
              element={
                <DashboardMain inner={<WithDrawFund />} name="Withdraw Fund " />
              }
            />
            <Route
              path={AuthenticatedRoutes.WITHDRAW_FUND_REPORT}
              element={
                <DashboardMain
                  inner={<WIthDrawFundReport />}
                  name="Withdraw Fund Report "
                />
              }
            />
            <Route
              path={AuthenticatedRoutes.ACCOUNT_STATEMENT}
              element={
                <DashboardMain
                  inner={<AccountStatement />}
                  name="Account Statement "
                />
              }
            />
            <Route
              path={AuthenticatedRoutes.INCOME_SUMMARY}
              element={
                <DashboardMain
                  inner={<IncomeSummary />}
                  name="Income Summary "
                />
              }
            />
            <Route
              path={AuthenticatedRoutes.SWAP}
              element={
                <DashboardMain
                  inner={<Swap />}
                  name="Swap Main Wallet To Package Wallet"
                />
              }
            />
            <Route
              path={AuthenticatedRoutes.SWAP_HISTORY}
              element={
                <DashboardMain inner={<SwapHistory />} name="Swap History" />
              }
            />

            {/* ============================> */}
            <Route
              path={AuthenticatedRoutes.ACHIEVEMENT_INCOME}
              element={
                <DashboardMain
                  inner={<AchievmentIncome />}
                  name="Achievement Income"
                />
              }
            />
            <Route
              path={AuthenticatedRoutes.ACTIVATE_BOT}
              element={
                <DashboardMain inner={<ActivateBot />} name="Trade Bot" />
              }
            />
            <Route
              path={AuthenticatedRoutes.BOT_PACKAGES}
              element={
                <DashboardMain inner={<BotPackages />} name="Bot Packages" />
              }
            />
            <Route
              path={AuthenticatedRoutes.IB_INCOME}
              element={<DashboardMain inner={<IBIncome />} name="IB Income" />}
            />
            <Route
              path={AuthenticatedRoutes.LEADERSHIP_RANKREWARD}
              element={
                <DashboardMain
                  inner={<LearderShipAndRankReward />}
                  name="Leadership Rank & Reward"
                />
              }
            />
            <Route
              path={AuthenticatedRoutes.LEADERSHIP_RANKREWARD}
              element={
                <DashboardMain
                  inner={<LearderShipAndRankReward />}
                  name="Leadership Rank & Reward"
                />
              }
            />
            <Route
              path={AuthenticatedRoutes.REWARD_INCOME}
              element={
                <DashboardMain inner={<RewarIncome />} name="Reward Income" />
              }
            />
            <Route
              path={AuthenticatedRoutes.TOPUP_MAIN_WALLET}
              element={
                <DashboardMain
                  inner={<TopupMainWallet />}
                  name="Topup Main Wallet"
                />
              }
            />
            <Route
              path={AuthenticatedRoutes.TRADING_LEVEL_INCOME}
              element={
                <DashboardMain
                  inner={<TradingLevelIncome />}
                  name="Service Level Income"
                />
              }
            />
            <Route
              path={AuthenticatedRoutes.TRADING_PROFIT}
              element={
                <DashboardMain
                  inner={<TradingProfit />}
                  name="Trading Profit"
                />
              }
            />
            <Route
              path={AuthenticatedRoutes.ACTIVATE_SERVICE_PACKAGE}
              element={
                <DashboardMain
                  inner={<ServicePacage />}
                  name="Activate Service Package"
                />
              }
            />
            <Route
              path={AuthenticatedRoutes.FAST_TRACK_INCOME}
              element={
                <DashboardMain
                  inner={<FastTrackIncome />}
                  name="Fast Track Income "
                />
              }
            />
            <Route
              path={AuthenticatedRoutes.ADD_INVESTMENT}
              element={
                <DashboardMain
                  inner={<AddInvestmentToUser />}
                  name="Add Investment to user "
                />
              }
            />
            <Route
              path={AuthenticatedRoutes.ADD_INVESTMENT_HISTORY}
              element={
                <DashboardMain
                  inner={<AddInvestmentHistory />}
                  name="Add Investment to user History "
                />
              }
            />
            <Route
              path={
                AuthenticatedRoutes.OTHER_SERVICE_PACKAGE_ACTIVATION_HISTORY
              }
              element={
                <DashboardMain
                  inner={<OtherServicePackageActivationtHistory />}
                  name="Other Service Package Activation History "
                />
              }
            />
            <Route
              path={AuthenticatedRoutes.ACTIVATE_USER_ID}
              element={
                <DashboardMain
                  inner={<ActivateUserId />}
                  name="Activate User ID"
                />
              }
            />
            <Route
              path={AuthenticatedRoutes.INVESTMENT_INVOICE}
              element={
                <DashboardMain inner={<Invoice />} name="Investment Invoice " />
              }
            />
            <Route
              path={AuthenticatedRoutes.BUSINESS_PLAN_HISTORY}
              element={
                <DashboardMain
                  inner={<BusinessPlanHistory />}
                  name="Business History"
                />
              }
            />
            <Route
              path={AuthenticatedRoutes.DEDUCT_FUND_HISTORY_BY_ADMIN}
              element={
                <DashboardMain
                  inner={<DeductHistoryByAdmin />}
                  name="Fund Deduct History"
                />
              }
            />
            <Route
              path={AuthenticatedRoutes.SERVICE_PACKAGE_ACTIVATION_HISTORY}
              element={
                <DashboardMain
                  inner={<ServicePackageActivationHistory />}
                  name="Service Package Activation History"
                />
              }
            />

            <Route
              path={AuthenticatedRoutes.MONTHLY_CLOSING_REPORT}
              element={
                <DashboardMain
                  inner={<MonthlyClosingReport />}
                  name="Monthly Closing Report"
                />
              }
            />
            <Route
              path={AuthenticatedRoutes.PORTFOLIO}
              element={<DashboardMain inner={<PortFolio />} name="Portfolio" />}
            />
            {/* <Route
                            path={AuthenticatedRoutes.FORGOT_PASSWORD}
                            element={
                                <DashboardMain
                                    inner={<ForgotPassword/>}
                                    name="Forget Password"
                                />
                            }
                        /> */}
          </>
        )}
      </Routes>
    </>
  );
};

export default Authenticate;
