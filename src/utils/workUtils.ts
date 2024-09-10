import { Work } from "@/types";

export const newWorkList: Work[] = [
    { id: '1', nameKey: 'work_farmer', salary: 40000, healthCost: 15, duration: 5, rejectionRate: 0.25 }, // 农民
    { id: '2', nameKey: 'work_restaurant_staff', salary: 42000, healthCost: 12, duration: 5, rejectionRate: 0.28 }, // 餐厅服务员
    { id: '3', nameKey: 'work_security', salary: 45000, healthCost: 15, duration: 5, rejectionRate: 0.3 }, // 保安
    { id: '4', nameKey: 'work_retail_worker', salary: 45000, healthCost: 15, duration: 5, rejectionRate: 0.3 }, // 零售店员
    { id: '5', nameKey: 'work_delivery', salary: 50000, healthCost: 15, duration: 5, rejectionRate: 0.3 }, // 外卖员
    { id: '6', nameKey: 'work_factory', salary: 55000, healthCost: 18, duration: 5, rejectionRate: 0.35 }, // 工厂工人
    { id: '7', nameKey: 'work_construction', salary: 60000, healthCost: 20, duration: 5, rejectionRate: 0.4 }, // 建筑工人
    { id: '8', nameKey: 'work_driver', salary: 70000, healthCost: 15, duration: 5, rejectionRate: 0.5 }, // 专车司机
    { id: '9', nameKey: 'work_tutor', salary: 80000, healthCost: 12, duration: 5, rejectionRate: 0.6 }, // 家教
    { id: '10', nameKey: 'work_teacher', salary: 90000, healthCost: 15, duration: 5, rejectionRate: 0.65 }, // 公立学校教师
    { id: '11', nameKey: 'work_coding', salary: 120000, healthCost: 20, duration: 5, rejectionRate: 0.7 }, // 编程
    { id: '12', nameKey: 'work_medical_staff', salary: 150000, healthCost: 20, duration: 5, rejectionRate: 0.75 }, // 医护人员
    { id: '13', nameKey: 'work_lawyer', salary: 200000, healthCost: 25, duration: 5, rejectionRate: 0.85 }, // 律师
    { id: '14', nameKey: 'work_financial_analyst', salary: 220000, healthCost: 30, duration: 5, rejectionRate: 0.88 }, // 金融分析师
    { id: '15', nameKey: 'work_software_engineer', salary: 250000, healthCost: 30, duration: 5, rejectionRate: 0.9 }, // AI工程师
    // 增加一些稀缺工作
    { id: '16', nameKey: 'work_department_director', salary: 300000, healthCost: 35, duration: 5, rejectionRate: 0.95 }, // 部门总监
    { id: '18', nameKey: 'work_ceo', salary: 800000, healthCost: 50, duration: 5, rejectionRate: 1 }, // 跨国公司董事长
    { id: '17', nameKey: 'work_mayor', salary: 40000, healthCost: 0, duration: 25, rejectionRate: 1 }, // 市长
    { id: '19', nameKey: 'work_president', salary: 1, healthCost: 0, duration: 50, rejectionRate: 1 }, // 总统
];
