import React from "react";
import { FaUsers, FaUserTie, FaWallet, FaRegNewspaper, FaBusinessTime, FaUser } from "react-icons/fa";
import { HiOutlineSquares2X2 } from "react-icons/hi2";
import { LuHandPlatter, LuPackageSearch, LuPickaxe, LuSettings } from "react-icons/lu";
import { AuthenticatedRoutes } from "../Routes";
import { MdOutlineAddCard } from "react-icons/md";
import { BiMoney, BiSupport } from "react-icons/bi";
import { TfiAnnouncement } from "react-icons/tfi";
import { BanknoteArrowDown, BookAlert, FileText, FolderSync, History, icons, Network, Package, ShieldCheck } from "lucide-react";
import { TbHistoryToggle, TbRecharging } from "react-icons/tb";
import { MainContent } from "./MainContent";
import { DoorClosedLocked } from 'lucide-react';
import { BsFillPinAngleFill } from "react-icons/bs";
import { SiWolframmathematica } from "react-icons/si";
import { VscActivateBreakpoints } from "react-icons/vsc";

export const SidebarContent = {
  user: [
    {
      title: "Main",
      items: [
        {
          id: "Dashboard",
          icon: <HiOutlineSquares2X2 size={22} />,
          name: "Dashboard",
          link: AuthenticatedRoutes.USER_DASHBOARD,
        },
        // {
        //   id: "Transaction Password",
        //   icon: <DoorClosedLocked size={22} />,
        //   name: "Setup Transaction Password",
        //   link: AuthenticatedRoutes.TRANSACTION_PASS,
        // },
        {
          id: "Settings",
          icon: <LuSettings size={22} />,
          name: "Settings",
          options: [
            {
              id: "Wallet",
              name: "Wallet",
              link: AuthenticatedRoutes.WALLET,
            },
            {
              id: "Profile",
              name: "Profile",
              link: AuthenticatedRoutes.PROFILE,
            },
          ],
        },
        {
          id: "Service Package",
          icon: <LuHandPlatter size={22} />,
          name: "Subscription Packages",
          options: [
            {
              id: "Service Package",
              icon: <LuHandPlatter size={22} />,
              name: "Subscription Packages",
              link: AuthenticatedRoutes.SERVICE_PACKAGES, // subscription packages / bot packages
            },
            {
              id: "Self Service Package Activation History",
              name: "Self Service Package Activation History",
              link: AuthenticatedRoutes.SERVICE_PACKAGE_ACTIVATION_HISTORY,
            },
          ]
        },



        {
          id: "Arbitrage Bot",
          icon: <LuPickaxe size={20} />,
          name: "Arbitrage Bot (Trading)",
          link: AuthenticatedRoutes.ACTIVATE_BOT,
          // options: [
          //   {
          //     id: "Activate Bot",
          //     name: "Activate Bot",
          //     link: AuthenticatedRoutes.ACTIVATE_BOT,
          //   },
          //   {
          //     id: "Bot Packages",
          //     name: "Bot Packages",
          //     link: AuthenticatedRoutes.BOT_PACKAGES,
          //   },
          //   {
          //     id: "Trading Profit",
          //     name: "Trading Profit",
          //     link: AuthenticatedRoutes.TRADING_PROFIT,
          //   },
          // ],
        },
        // {
        //   id: "Activate User ID",
        //   icon: <VscActivateBreakpoints size={20} />,
        //   name: "Activate User ID",
        //   link: AuthenticatedRoutes.ACTIVATE_USER_ID,
        // },
        {
          id: "Deposit",
          icon: <BanknoteArrowDown size={20} />,
          name: "Deposit",
          options: [
            {
              id: "Make Investment",
              name: "Make Investment",
              link: AuthenticatedRoutes.MAKE_INVESTMENT,
            },
            {
              id: "Investment History",
              name: "Investment History",
              link: AuthenticatedRoutes.INVESTMENT_HISTORY,
            },
          ],
        },

        {
          id: "Add Investment && Service Package",
          icon: <LuSettings size={20} />,
          name: "Activate Packages ",
          options: [

            {
              id: " Activate Service Package To Other User",
              name: "Activate Service Package To Other User",
              link: AuthenticatedRoutes.ACTIVATE_SERVICE_PACKAGE,
            },

            {
              id: "Other Service Package Activation History",
              name: "Other Service Package Activation History",
              link: AuthenticatedRoutes.OTHER_SERVICE_PACKAGE_ACTIVATION_HISTORY,
            },
            {
              id: "Add Investment To Other User",
              name: "Add Investment To Other User",
              link: AuthenticatedRoutes.ADD_INVESTMENT,
            },
            {
              id: "Add Investment To Other User History",
              name: "Add Investment To Other User History",
              link: AuthenticatedRoutes.ADD_INVESTMENT_HISTORY,
            },
          ],
        },


        // {
        //   id: "Package Wallet History",
        //   icon: <History />,
        //   name: "Package Wallet History",
        //   link: AuthenticatedRoutes.USER_PACKAGE_WALLET_HISTORY,
        // },
        {
          id: "Network",
          icon: <Network size={20} />,
          name: "Network",
          options: [
            {
              id: "Direct Team",
              name: "Direct Team",
              link: AuthenticatedRoutes.TEAM_DIRECT,
            },
            // {
            //   id: "Level Team",
            //   name: "Level Team",
            //   link: AuthenticatedRoutes.ALL_TEAM,
            // },
            // {
            //   id: "Team Tree",
            //   name: "Team Tree",
            //   link: AuthenticatedRoutes.TEAM_TREE,
            // },
            {
              id: "All Team",
              name: "All Team",
              link: AuthenticatedRoutes.ALL_TEAM_NETWORK,
            },
            {
              id: "Business History",
              name: "Business History",
              link: AuthenticatedRoutes.BUSINESS_PLAN_HISTORY,
            },
          ],
        },
      ],
    },

    {
      title: "Earnings & Reports",
      items: [
        {
          id: "Income Report",
          icon: <LuPackageSearch size={20} />,
          name: "Income Report",
          options: [
            { id: "Level Income", name: " Trade Level Income", link: AuthenticatedRoutes.LEVEL_INCOME_REPORT },
            { id: "Matching Income", name: "Matching Income", link: AuthenticatedRoutes.MATCHING_INCOME },
            { id: "Club Income", name: "Club Income", link: AuthenticatedRoutes.CLUB_INCOME },
            { id: "Fast Track Income", name: "Fast Track Income", link: AuthenticatedRoutes.FAST_TRACK_INCOME },
            // { id: "Achievement Income", name: "Achievement Income", link: AuthenticatedRoutes.ACHIEVEMENT_INCOME },
            { id: "Trading Profit", name: "Trading Profit", link: AuthenticatedRoutes.ROI_INCOME_REPORT }, // from bot
            { id: "Service Level Income", name: "Service Level Income", link: AuthenticatedRoutes.TRADING_LEVEL_INCOME },
            { id: "Reward Income", name: "Reward Income", link: AuthenticatedRoutes.REWARD_INCOME },
            { id: "IB Income", name: "IB Income", link: AuthenticatedRoutes.IB_INCOME },
            //      {
            //   id: "Leadership",
            //   icon: <ShieldCheck />,
            //   name: "Leadership Income",
            //   link: AuthenticatedRoutes.LEADERSHIP_RANKREWARD, // page listing Rank tiers (Aspire..Royal Crown Ambassador)
            // },
            // keep consistent naming with backend reports
          ],
        },
        // {
        //   id: "Fund Deduct History ",
        //   icon: <HiOutlineSquares2X2 size={20} />,
        //   name: "Fund Deduct History ",
        //   link: AuthenticatedRoutes.DEDUCT_FUND_HISTORY_BY_ADMIN,
        // },


        {
          id: "Portfolio",
          icon: <BookAlert size={22} />,
          name: "Portfolio",
          link: AuthenticatedRoutes.PORTFOLIO, // subscription packages / bot packages
        },

        {
          id: "Financial",
          icon: <FaWallet size={20} />,
          name: "Financial",
          options: [
            { id: "Withdraw Fund", name: "Withdraw Fund", link: AuthenticatedRoutes.WITHDRAW_FUND_BOT },
            { id: "Withdrawal Report", name: "Withdraw Fund Report", link: AuthenticatedRoutes.WITHDRAW_FUND_REPORT },
            { id: "Principal Withdraw Report", name: "Principal Withdraw Report", link: AuthenticatedRoutes.TOPUP_MAIN_WALLET },
          ],
        },
        {
          id: "P2P Transfer",
          icon: <FolderSync size={20} />,
          name: "P2P Transfer",
          options: [
            { id: "P2P Transfer", name: "P2P Transfer", link: AuthenticatedRoutes.TRANSFER_FUND },
            { id: "P2P Transfer Report", name: "P2P Transfer Report", link: AuthenticatedRoutes.TRANSFER_FUND_REPORT },
          ],
        },
        {
          id: "Swap",
          icon: <FolderSync size={20} />,
          name: "Swap",
          options: [
            { id: "Swap", name: "Swap (Main → Package Wallet)", link: AuthenticatedRoutes.SWAP },
            { id: "Swap History", name: "Swap History", link: AuthenticatedRoutes.SWAP_HISTORY },
          ],
        },

        // {
        //   id: "Earning Simulation",
        //   icon: <FaBusinessTime />,
        //   name: "Earning Simulation",
        //   link: AuthenticatedRoutes.EARNING_SIMULATION,
        // },


      ],
    },
    {
      title: "Others",
      items: [
        {
          id: "Support",
          icon: <BiSupport size={20} />,
          name: "Help & Support",
          options: [
            { id: "Raise Ticket", name: "Raise Ticket", link: AuthenticatedRoutes.SUPPORT_RAISE_TICKET },
            { id: "Ticket History", name: "Raise Ticket History", link: AuthenticatedRoutes.SUPPORT_RAISE_TICKET_HISTORY },
          ],
        },
        {
          id: "Presentation ",
          icon: <FileText size={20} />,
          name: "Presentation ",
          link: AuthenticatedRoutes.PERSENTATION,
        },
      ],
    },
  ],

  admin: [
    {
      title: "Main",
      items: [
        {
          id: "Dashboard",
          icon: <HiOutlineSquares2X2 size={20} />,
          name: "Dashboard",
          link: AuthenticatedRoutes.ADMIN_DASHBOARD,
        },

        {
          id: "Users",
          icon: <FaUsers size={20} />,
          name: "Users",
          options: [
            { id: "All Users", name: "All Users", link: AuthenticatedRoutes.ALL_USERS },
            { id: "Active Users", name: "Active Users", link: AuthenticatedRoutes.ACTIVE_USERS },
            { id: "Bulk Register", name: "Bulk Register", link: AuthenticatedRoutes.BULK_REGISTER },
            // { id: "Admin Register", name: "Adminv Register", link: AuthenticatedRoutes.BULK_REGISTER },
          ],
        },

        {
          id: "FinancialReports",
          icon: <FaUserTie size={20} />,
          name: "Financial Reports",
          options: [
            { id: "Package Purchase History", name: "Package Purchase History", link: AuthenticatedRoutes.PURCHASE_PLAN_HISTORY },
            { id: "Service Package History", name: "Service Package Purchase History", link: AuthenticatedRoutes.SERVICE_PACKAGE_HISTORY },

            { id: "Service Level Income History", name: "Service Level Income History", link: AuthenticatedRoutes.SERVICE_LEVEL_INCOME_REPORT },

            { id: "Trading Profit Income History", name: "Trading Profit Income History", link: AuthenticatedRoutes.ROI_INCOME_HISTORY },
            { id: " Trade Level Income History", name: " Trade Level Income History", link: AuthenticatedRoutes.LEVEL_INCOME_REPORT },
            { id: "Matching Income History", name: "Matching Income History", link: AuthenticatedRoutes.MATCHING_INCOME_REPORT_BOTX },
            { id: "Club Income History", name: "Club Income History", link: AuthenticatedRoutes.CLUB_INCOME_HISTORY },
            {
              id: "Rank Reward History",
              name: "Rank Reward History",
              link: AuthenticatedRoutes.RANK_REWARD,
            },
            // { id: "Achievement Income History", name: "Achievement Income History", link: AuthenticatedRoutes.ACHIEVEMENT_INCOME_HISTORY },
            // { id: "Trading Profit History", name: "Trading Profit History", link: AuthenticatedRoutes.TRADING_PROFIT_HISTORY },
            // { id: "Trading Level Income History", name: "Trading Level Income History", link: AuthenticatedRoutes.TRADING_LEVEL_INCOME_HISTORY },
            // { id: "Reward Income History", name: "Reward Income History", link: AuthenticatedRoutes.REWARD_INCOME_HISTORY },
            { id: "IB Income History", name: "IB Income History", link: AuthenticatedRoutes.ADMIN_IB_INCOME_HISTORY },
            { id: "Fast Track Income History", name: "Fast Track Income History", link: AuthenticatedRoutes.ADMIN_FAST_TRACK_HISTORY },
          ],
        },

        {
          id: "Activate Service Package",
          icon: <Package size={20} />,
          name: "Activate Service Package",
          link: AuthenticatedRoutes.TOPUP_USERS,
        },

        {
          id: "Add Fund to Package Wallet",
          icon: <TbRecharging size={20} />,
          name: "Add Fund to Wallet",
          link: AuthenticatedRoutes.TOPUP_PACKAGE_WALLET,
        },

        {
          id: "TopupPackageWalletHistory",
          icon: <TbHistoryToggle size={20} />,
          name: "Topup  Wallet History",
          link: AuthenticatedRoutes.TOPUP_PACKAGE_WALLET_HISTORY,
        },
        {
          id: "Add Matching",
          icon: <SiWolframmathematica size={20} />,
          name: "Add Matching",
          link: AuthenticatedRoutes.ADD_MATCHING,
        },
        {
          id: "Add Bot Business",
          icon: <FaUser size={20} />,
          name: "Add Virtual Team",
          link: AuthenticatedRoutes.ADD_BOT_BUSINESS,
        },
        {
          id: "Add Fund Business",
          icon: <BiMoney size={20} />,
          name: "Add Fund Business",
          link: AuthenticatedRoutes.ADD_FUND_BUSINESS,
        },
        {
          id: "Pin ID",
          icon: <BsFillPinAngleFill size={20} />,
          name: "Pin ID",
          link: AuthenticatedRoutes.PIN_ID,
        },

        // {
        //   id: "P2P History",
        //   icon: <HiOutlineSquares2X2 size={20} />,
        //   name: "P2P History",
        //   link: AuthenticatedRoutes.P2P_HISTORY,
        // },

        {
          id: "Withdrawal Requests",
          icon: <FaWallet size={20} />,
          name: "Withdrawal",
          options: [
            { id: "Withdrawal History", name: "Withdrawal History", link: AuthenticatedRoutes.APPROVED_WITHDRAWAL_REQUEST },
            // { id: "Pending Withdrawals", name: "Pending Withdrawals", link: AuthenticatedRoutes.PENDING_WITHDRAWAL_REQUEST },
            { id: "Principal Withdrawal History", name: "Principal Withdrawal History", link: AuthenticatedRoutes.PRINCIPLE_WITHDRAW_REPORT },

          ],
        },

        {
          id: "Admin Control",
          icon: <FaWallet size={20} />,
          name: "Admin Control",
          options: [
            { id: "Withdrawal Block", name: "Withdrawal Block", link: AuthenticatedRoutes.WITHDRAWAL_BLOCK },
            { id: "Maintenance Mode", name: "Maintenance Mode", link: AuthenticatedRoutes.MAINTENANCE_MODE },
            { id: "Deduct Fund", name: "Deduct Fund", link: AuthenticatedRoutes.DEDUCT_FUND },
            { id: "Deduct Investment", name: "Deduct Investment", link: AuthenticatedRoutes.DEDUCT_INVESTMENT },
            { id: "Deduct Fund History", name: "Deduct Fund History", link: AuthenticatedRoutes.ADMIN_DEDUCT_FUND_HISTORY },
            // { id: "Transaction Limit", name: "Transaction Limit", link: AuthenticatedRoutes.TRANSACTION_LIMIT },
            // { id: "Package Settings", name: "Package Settings", link: AuthenticatedRoutes.PACKAGE_SETTINGS },
          ],
        },
      ],
    },

    // {
    //   title: "Platform",
    //   items: [
    //     {
    //       id: "SubscriptionPackages",
    //       icon: <LuHandPlatter />,
    //       name: "Subscription Packages",
    //       link: AuthenticatedRoutes.SUBSCRIPTION_PACKAGES,
    //     },
    //     {
    //       id: "GenerationDistribution",
    //       icon: <MdOutlineAddCard />,
    //       name: "Generation Distribution",
    //       link: AuthenticatedRoutes.GENRATION_DISTRIBUTION,
    //     },
    //     {
    //       id: "LeadershipRanks",
    //       icon: <ShieldCheck />,
    //       name: "Leadership / Rank & Rewards",
    //       link: AuthenticatedRoutes.LEADERSHIP_RANK_REWARD_DETAILS,
    //     },
    //     // {
    //     //   id: "EarningSimulation",
    //     //   icon: <FaBusinessTime />,
    //     //   name: "Earning Simulation",
    //     //   link: AuthenticatedRoutes.EARNING_SIMULATION_ADMIN,
    //     // },
    //     {
    //       id: "BotControl",
    //       icon: <LuPickaxe />,
    //       name: "Bot / Trading Control",
    //       options: [
    //         { id: "Bot Orders", name: "Bot Orders", link: AuthenticatedRoutes.BOT_ORDERS },
    //         // { id: "Bot Performance", name: "Bot Performance", link: AuthenticatedRoutes.BOT_PERFORMANCE },
    //         { id: "Bot Settings", name: "Bot Settings", link: AuthenticatedRoutes.BOT_SETTINGS },
    //       ],
    //     },
    //   ],
    // },

    {
      title: "Others",
      items: [
        {
          id: "Notifications",
          icon: <FaRegNewspaper size={20} />,
          name: "Notifications",
          link: AuthenticatedRoutes.NEWS_AND_NOTIF_ADMIN,
        },
        {
          id: "Support",
          icon: <BiSupport size={20} />,
          name: "Help & Support",
          options: [
            { id: "Support history", name: "Raise Ticket History", link: AuthenticatedRoutes.RAISE_TICKET_LIST },
          ],
        },
      ],
    },

  ],
};
