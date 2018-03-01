/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50505
Source Host           : localhost:3306
Source Database       : db_market

Target Server Type    : MYSQL
Target Server Version : 50505
File Encoding         : 65001

Date: 2018-03-02 01:32:58
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `products`
-- ----------------------------
DROP TABLE IF EXISTS `products`;
CREATE TABLE `products` (
  `p_id` int(5) NOT NULL,
  `p_name` varchar(30) NOT NULL,
  `p_description` varchar(300) NOT NULL,
  `p_category` varchar(30) NOT NULL,
  `p_price` int(11) NOT NULL,
  `p_stock` int(11) NOT NULL,
  `u_id` int(11) NOT NULL,
  PRIMARY KEY (`p_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of products
-- ----------------------------
INSERT INTO `products` VALUES ('1', 'กระเป๋าผ้าบาติก', 'Product Description', '3', '183', '100', '1');
INSERT INTO `products` VALUES ('2', 'กระจาด(ใหญ่)', 'Product Description', '3', '172', '100', '1');
INSERT INTO `products` VALUES ('3', 'กาน้ำชา', 'Product Description', '3', '167', '100', '2');
INSERT INTO `products` VALUES ('4', 'กรงนกเขา', 'Product Description', '3', '177', '100', '1');
INSERT INTO `products` VALUES ('5', 'กะปิเทพา', 'Product Description', '2', '123', '100', '1');
INSERT INTO `products` VALUES ('6', 'เสื้อบาติกดำ', 'Product Description', '1', '300', '100', '1');
INSERT INTO `products` VALUES ('7', 'เสื้อบาติก', 'Product Description', '1', '450', '100', '1');
INSERT INTO `products` VALUES ('8', 'ผ้าโสร่ง', 'Product Description', '1', '150', '100', '1');
INSERT INTO `products` VALUES ('9', 'กกก', 'ดดเเ', '1', '20', '5550', '1');
INSERT INTO `products` VALUES ('12', 'sss', 'ddd', '1', '30', '10', '1');
INSERT INTO `products` VALUES ('13', 'กดดด', 'เเ', '1', '30', '20', '1');
INSERT INTO `products` VALUES ('14', 'ggg', 'Gg', '1', '50', '20', '1');

-- ----------------------------
-- Table structure for `products_image`
-- ----------------------------
DROP TABLE IF EXISTS `products_image`;
CREATE TABLE `products_image` (
  `img_id` int(11) NOT NULL,
  `img_name` varchar(255) NOT NULL,
  `p_id` int(11) NOT NULL,
  PRIMARY KEY (`img_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of products_image
-- ----------------------------
INSERT INTO `products_image` VALUES ('1', '1.jpg', '1');
INSERT INTO `products_image` VALUES ('2', '400116-A05L.jpg', '2');
INSERT INTO `products_image` VALUES ('3', '901007A04.jpg', '3');
INSERT INTO `products_image` VALUES ('4', 'f10422a.jpg', '4');
INSERT INTO `products_image` VALUES ('5', 'oly_230855_1538as.jpg', '5');
INSERT INTO `products_image` VALUES ('6', '124980_112f08f6-18a8-11e5-9f01-c15387772fba.jpg', '6');
INSERT INTO `products_image` VALUES ('7', '308406_9a2f38f6-b737-11e4-91ed-006d2523fab8.jpg', '7');
INSERT INTO `products_image` VALUES ('8', '20100807035450.jpg', '8');
INSERT INTO `products_image` VALUES ('9', '1519048748.jpg', '9');
INSERT INTO `products_image` VALUES ('10', '1519048706.jpg', '9');
INSERT INTO `products_image` VALUES ('11', '1519096339.jpg', '10');
INSERT INTO `products_image` VALUES ('12', '1519096628.jpg', '11');
INSERT INTO `products_image` VALUES ('13', '1519192658.jpg', '9');
INSERT INTO `products_image` VALUES ('14', '1519399791.jpg', '10');
INSERT INTO `products_image` VALUES ('15', '1519193227.jpg', '10');
INSERT INTO `products_image` VALUES ('16', '1519401393.jpg', '11');
INSERT INTO `products_image` VALUES ('17', '1519402342.jpg', '12');
INSERT INTO `products_image` VALUES ('18', '1519402582.jpg', '13');
INSERT INTO `products_image` VALUES ('19', '1519745240.jpg', '14');
INSERT INTO `products_image` VALUES ('20', '1519745270.jpg', '14');

-- ----------------------------
-- Table structure for `products_image_temp`
-- ----------------------------
DROP TABLE IF EXISTS `products_image_temp`;
CREATE TABLE `products_image_temp` (
  `id` int(11) NOT NULL,
  `u_id` int(11) NOT NULL,
  `image` varchar(500) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of products_image_temp
-- ----------------------------

-- ----------------------------
-- Table structure for `tb_admin`
-- ----------------------------
DROP TABLE IF EXISTS `tb_admin`;
CREATE TABLE `tb_admin` (
  `admin_id` int(11) NOT NULL,
  `admin_name` varchar(255) NOT NULL,
  `admin_lname` varchar(255) NOT NULL,
  `admin_username` varchar(255) NOT NULL,
  `admin_password` varchar(255) NOT NULL,
  `admin_phone` varchar(255) NOT NULL,
  PRIMARY KEY (`admin_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tb_admin
-- ----------------------------

-- ----------------------------
-- Table structure for `tb_bank`
-- ----------------------------
DROP TABLE IF EXISTS `tb_bank`;
CREATE TABLE `tb_bank` (
  `bank_id` int(11) NOT NULL,
  `bank_name` varchar(200) NOT NULL,
  `bank_code` varchar(200) NOT NULL,
  PRIMARY KEY (`bank_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tb_bank
-- ----------------------------
INSERT INTO `tb_bank` VALUES ('1', 'ธนาคารกรุงศรีอยุธยา (KrungsriOnline)', 'internet_banking_bay');
INSERT INTO `tb_bank` VALUES ('2', 'ธนาคารกรุงเทพ (Bualuang iBanking)', 'internet_banking_bbl');
INSERT INTO `tb_bank` VALUES ('3', 'ธนาคารกรุงไทย (KTB Netbank)', 'internet_banking_ktb');
INSERT INTO `tb_bank` VALUES ('4', 'ธนาคารไทยพาณิชย์ (SCBEasy)', 'internet_banking_scb');

-- ----------------------------
-- Table structure for `tb_cart`
-- ----------------------------
DROP TABLE IF EXISTS `tb_cart`;
CREATE TABLE `tb_cart` (
  `cart_id` int(11) NOT NULL,
  `u_id` int(11) NOT NULL,
  `p_id` varchar(5) NOT NULL,
  `c_qty` int(11) NOT NULL,
  `c_price` float NOT NULL,
  `ip` varchar(200) NOT NULL,
  `uuid` varchar(200) NOT NULL,
  `dt` datetime NOT NULL,
  PRIMARY KEY (`cart_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tb_cart
-- ----------------------------
INSERT INTO `tb_cart` VALUES ('1', '1', '1', '1', '183', '192.168.1.46', 'be1bea965d8427a8', '2018-03-01 22:18:11');

-- ----------------------------
-- Table structure for `tb_categories`
-- ----------------------------
DROP TABLE IF EXISTS `tb_categories`;
CREATE TABLE `tb_categories` (
  `cat_id` int(11) NOT NULL,
  `cat_name` varchar(255) NOT NULL,
  `cat_img` varchar(255) NOT NULL,
  PRIMARY KEY (`cat_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tb_categories
-- ----------------------------
INSERT INTO `tb_categories` VALUES ('1', 'เสื้อผ้า', '1.png');
INSERT INTO `tb_categories` VALUES ('2', 'อาหาร', '2.png');
INSERT INTO `tb_categories` VALUES ('3', 'อุุปกรณ์ต่างๆ', '3.png');

-- ----------------------------
-- Table structure for `tb_charges_history`
-- ----------------------------
DROP TABLE IF EXISTS `tb_charges_history`;
CREATE TABLE `tb_charges_history` (
  `order_doc` varchar(10) NOT NULL,
  `charge_id` varchar(200) NOT NULL,
  `ordered` int(11) NOT NULL,
  PRIMARY KEY (`order_doc`,`charge_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tb_charges_history
-- ----------------------------
INSERT INTO `tb_charges_history` VALUES ('ODR0000002', 'chrg_test_5b4hu8hj7s51rev8zhx', '1');
INSERT INTO `tb_charges_history` VALUES ('ODR0000003', 'chrg_test_5b4hv9r6uaxgpvt0gnb', '2');
INSERT INTO `tb_charges_history` VALUES ('ODR0000004', 'chrg_test_5b4hvwekj9dh1bdjhhc', '3');
INSERT INTO `tb_charges_history` VALUES ('ODR0000005', 'chrg_test_5b4hwv391szn7x2b5ou', '4');
INSERT INTO `tb_charges_history` VALUES ('ODR0000006', 'chrg_test_5b4hx46cmiy64u5ey21', '5');
INSERT INTO `tb_charges_history` VALUES ('ODR0000007', 'chrg_test_5b4i3e7lq37tod0d0a4', '6');
INSERT INTO `tb_charges_history` VALUES ('ODR0000008', 'chrg_test_5b4nk6eatjb9tcbavrq', '7');

-- ----------------------------
-- Table structure for `tb_notification`
-- ----------------------------
DROP TABLE IF EXISTS `tb_notification`;
CREATE TABLE `tb_notification` (
  `noti_id` int(11) NOT NULL,
  `noti_title` varchar(200) NOT NULL,
  `noti_message` varchar(200) NOT NULL,
  `u_id` int(11) NOT NULL,
  `readed` varchar(1) NOT NULL,
  PRIMARY KEY (`noti_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tb_notification
-- ----------------------------
INSERT INTO `tb_notification` VALUES ('1', 'Commmarket', 'มีลูกค้าได้ทำการสั่งซื้อสินค้าของคุณ สามารถตรวจสอบได้ค่ะ', '1', 'N');
INSERT INTO `tb_notification` VALUES ('2', 'Commmarket', 'มีลูกค้าได้ทำการสั่งซื้อสินค้าของคุณ สามารถตรวจสอบได้ค่ะ', '2', 'N');
INSERT INTO `tb_notification` VALUES ('3', 'Commmarket', 'มีลูกค้าได้ทำการสั่งซื้อสินค้าของคุณ สามารถตรวจสอบได้ค่ะ', '1', 'N');
INSERT INTO `tb_notification` VALUES ('4', 'Commmarket', 'มีลูกค้าได้ทำการสั่งซื้อสินค้าของคุณ สามารถตรวจสอบได้ค่ะ', '2', 'N');
INSERT INTO `tb_notification` VALUES ('5', 'Commmarket', 'มีลูกค้าได้ทำการสั่งซื้อสินค้าของคุณ สามารถตรวจสอบได้ค่ะ', '1', 'N');
INSERT INTO `tb_notification` VALUES ('6', 'Commmarket', 'มีลูกค้าได้ทำการสั่งซื้อสินค้าของคุณ สามารถตรวจสอบได้ค่ะ', '1', 'N');
INSERT INTO `tb_notification` VALUES ('7', 'Commmarket', 'มีลูกค้าได้ทำการสั่งซื้อสินค้าของคุณ สามารถตรวจสอบได้ค่ะ', '2', 'N');
INSERT INTO `tb_notification` VALUES ('8', 'Commmarket', 'มีลูกค้าได้ทำการสั่งซื้อสินค้าของคุณ สามารถตรวจสอบได้ค่ะ', '1', 'N');
INSERT INTO `tb_notification` VALUES ('9', 'Commmarket', 'มีลูกค้าได้ทำการสั่งซื้อสินค้าของคุณ สามารถตรวจสอบได้ค่ะ', '1', 'N');

-- ----------------------------
-- Table structure for `tb_order`
-- ----------------------------
DROP TABLE IF EXISTS `tb_order`;
CREATE TABLE `tb_order` (
  `order_id` int(11) NOT NULL,
  `order_doc` varchar(10) NOT NULL,
  `u_id_saler` int(11) NOT NULL,
  `u_id` int(11) NOT NULL,
  `sum_price` varchar(255) NOT NULL,
  `address_name` varchar(255) NOT NULL,
  `address_phone` varchar(255) NOT NULL,
  `address_address` varchar(255) NOT NULL,
  `ship_id` int(11) NOT NULL,
  `order_date` date NOT NULL,
  `status` varchar(255) NOT NULL,
  PRIMARY KEY (`order_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tb_order
-- ----------------------------
INSERT INTO `tb_order` VALUES ('1', 'ODR0000001', '1', '1', '183', 'อิสมาแอ ดือราแม', '1339', '222/1 ม.3 ต.ตะลิงชัน อ.บันนังสตา จ.ยะลา 95130', '0', '2018-03-01', 'Y');
INSERT INTO `tb_order` VALUES ('2', 'ODR0000001', '2', '1', '167', 'อิสมาแอ ดือราแม', '1339', '222/1 ม.3 ต.ตะลิงชัน อ.บันนังสตา จ.ยะลา 95130', '0', '2018-03-01', 'Y');
INSERT INTO `tb_order` VALUES ('3', 'ODR0000002', '1', '1', '183', 'อิสมาแอ ดือราแม', '1339', '222/1 ม.3 ต.ตะลิงชัน อ.บันนังสตา จ.ยะลา 95130', '0', '2018-03-01', 'Y');
INSERT INTO `tb_order` VALUES ('4', 'ODR0000002', '2', '1', '167', 'อิสมาแอ ดือราแม', '1339', '222/1 ม.3 ต.ตะลิงชัน อ.บันนังสตา จ.ยะลา 95130', '0', '2018-03-01', 'Y');
INSERT INTO `tb_order` VALUES ('5', 'ODR0000003', '1', '1', '172', 'aaa11', 'ss22', 'dd33', '0', '2018-03-01', 'N');
INSERT INTO `tb_order` VALUES ('6', 'ODR0000004', '1', '1', '355', 'sss', '2222', '33333', '0', '2018-03-01', 'Y');
INSERT INTO `tb_order` VALUES ('7', 'ODR0000005', '1', '1', '172', 'อิสมาแอ ดือราแม', '1339', '222/1 ม.3 ต.ตะลิงชัน อ.บันนังสตา จ.ยะลา 95130', '0', '2018-03-01', 'Y');
INSERT INTO `tb_order` VALUES ('8', 'ODR0000005', '2', '1', '167', 'อิสมาแอ ดือราแม', '1339', '222/1 ม.3 ต.ตะลิงชัน อ.บันนังสตา จ.ยะลา 95130', '0', '2018-03-01', 'Y');
INSERT INTO `tb_order` VALUES ('9', 'ODR0000006', '1', '1', '183', 'อิสมาแอ ดือราแม', '1339', '222/1 ม.3 ต.ตะลิงชัน อ.บันนังสตา จ.ยะลา 95130', '0', '2018-03-01', 'N');
INSERT INTO `tb_order` VALUES ('10', 'ODR0000007', '1', '1', '183', 'อิสมาแอ ดือราแม', '1339', '222/1 ม.3 ต.ตะลิงชัน อ.บันนังสตา จ.ยะลา 95130', '0', '2018-03-01', 'Y');
INSERT INTO `tb_order` VALUES ('11', 'ODR0000008', '1', '1', '366', 'อิสมาแอ ดือราแม', '1339', '222/1 ม.3 ต.ตะลิงชัน อ.บันนังสตา จ.ยะลา 95130', '0', '2018-03-01', 'Y');

-- ----------------------------
-- Table structure for `tb_order_detail`
-- ----------------------------
DROP TABLE IF EXISTS `tb_order_detail`;
CREATE TABLE `tb_order_detail` (
  `order_id` int(11) NOT NULL,
  `p_id` int(11) NOT NULL,
  `qty` varchar(255) NOT NULL,
  `price` varchar(255) NOT NULL,
  PRIMARY KEY (`order_id`,`p_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tb_order_detail
-- ----------------------------
INSERT INTO `tb_order_detail` VALUES ('1', '1', '1', '183');
INSERT INTO `tb_order_detail` VALUES ('2', '3', '1', '167');
INSERT INTO `tb_order_detail` VALUES ('3', '1', '1', '183');
INSERT INTO `tb_order_detail` VALUES ('4', '3', '1', '167');
INSERT INTO `tb_order_detail` VALUES ('5', '2', '1', '172');
INSERT INTO `tb_order_detail` VALUES ('6', '1', '1', '183');
INSERT INTO `tb_order_detail` VALUES ('6', '2', '1', '172');
INSERT INTO `tb_order_detail` VALUES ('7', '2', '1', '172');
INSERT INTO `tb_order_detail` VALUES ('8', '3', '1', '167');
INSERT INTO `tb_order_detail` VALUES ('9', '1', '1', '183');
INSERT INTO `tb_order_detail` VALUES ('10', '1', '1', '183');
INSERT INTO `tb_order_detail` VALUES ('11', '1', '2', '366');

-- ----------------------------
-- Table structure for `tb_pay`
-- ----------------------------
DROP TABLE IF EXISTS `tb_pay`;
CREATE TABLE `tb_pay` (
  `oder_id` int(11) NOT NULL,
  `date` date NOT NULL,
  `time` time NOT NULL,
  `pay_type` varchar(255) NOT NULL,
  `pay_doc` varchar(255) NOT NULL,
  `pay_doc_path` varchar(255) NOT NULL,
  `received` varchar(1) NOT NULL,
  PRIMARY KEY (`oder_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tb_pay
-- ----------------------------

-- ----------------------------
-- Table structure for `tb_pay_type`
-- ----------------------------
DROP TABLE IF EXISTS `tb_pay_type`;
CREATE TABLE `tb_pay_type` (
  `pay_type_id` int(11) NOT NULL,
  `pay_type_name` varchar(200) NOT NULL,
  PRIMARY KEY (`pay_type_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tb_pay_type
-- ----------------------------
INSERT INTO `tb_pay_type` VALUES ('1', 'ชำระเงินปลายทาง');
INSERT INTO `tb_pay_type` VALUES ('2', 'ชำระผ่านบัตรเครดิต');
INSERT INTO `tb_pay_type` VALUES ('3', 'อินเตอร์เน็ตแบงค์กิ้ง');

-- ----------------------------
-- Table structure for `tb_ship`
-- ----------------------------
DROP TABLE IF EXISTS `tb_ship`;
CREATE TABLE `tb_ship` (
  `ship_id` int(11) NOT NULL,
  `ship_phone` varchar(255) NOT NULL,
  `company_name` varchar(255) NOT NULL,
  `company_address` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ship_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tb_ship
-- ----------------------------

-- ----------------------------
-- Table structure for `tb_user_device`
-- ----------------------------
DROP TABLE IF EXISTS `tb_user_device`;
CREATE TABLE `tb_user_device` (
  `user_device_id` int(11) NOT NULL,
  `u_id` int(11) NOT NULL,
  `player_id` varchar(200) NOT NULL,
  `dt` datetime NOT NULL,
  PRIMARY KEY (`user_device_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tb_user_device
-- ----------------------------
INSERT INTO `tb_user_device` VALUES ('1', '1', '7f865ea0-336b-4891-bcf7-ae0ebb6bc877', '2018-03-01 23:32:32');

-- ----------------------------
-- Table structure for `users`
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `u_id` int(11) NOT NULL,
  `u_name` varchar(300) NOT NULL,
  `u_comm` varchar(300) NOT NULL,
  `u_username` varchar(300) NOT NULL,
  `u_password` varchar(300) NOT NULL,
  `u_phone` varchar(300) NOT NULL,
  `u_address` varchar(300) NOT NULL,
  `u_market` varchar(300) NOT NULL,
  `sale_cat` int(11) NOT NULL,
  `status` varchar(1) NOT NULL,
  `confirm` varchar(200) NOT NULL,
  PRIMARY KEY (`u_id`),
  UNIQUE KEY `uk_u_username` (`u_username`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES ('1', 'อิสมาแอ ดือราแม', '', 'eee@gmail.com', '138193', '1339', '222/1 ม.3 ต.ตะลิงชัน อ.บันนังสตา จ.ยะลา 95130', 'dad', '0', 'Y', 'ssssssssssssssssssssssss');
INSERT INTO `users` VALUES ('2', 'สสส', 'รูสะมิแล', 'r_kee19384@hotmail.com', '123456', '012345', '123/1', '', '1', 'Y', '213de5522f7a52b191e3df22b3f77a38');

-- ----------------------------
-- Table structure for `users_address`
-- ----------------------------
DROP TABLE IF EXISTS `users_address`;
CREATE TABLE `users_address` (
  `id` int(11) NOT NULL,
  `u_id` int(11) NOT NULL,
  `u_name` varchar(300) NOT NULL,
  `u_phone` varchar(300) NOT NULL,
  `u_address` varchar(300) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of users_address
-- ----------------------------
INSERT INTO `users_address` VALUES ('1', '1', 'sss', '2222', '33333');
INSERT INTO `users_address` VALUES ('2', '1', 'aaa11', 'ss22', 'dd33');
INSERT INTO `users_address` VALUES ('3', '1', 'hhh', 'ttt', 'Ttt');
