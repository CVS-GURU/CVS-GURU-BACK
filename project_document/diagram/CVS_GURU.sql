CREATE TABLE `user_info` (
	`user_id`	varchar(30)	NOT NULL	COMMENT '유저아이디',
	`password`	varchar(300)	NOT NULL	COMMENT '비밀번호',
	`user_name`	varchar(300)	NOT NULL	COMMENT '유저이름',
	`user_email`	varchar(100)	NOT NULL	COMMENT '유저이메일',
	`user_profile_image`	varchar(1000)	NULL	COMMENT '유저프로필사진',
	`user_nickname`	varchar(100)	NOT NULL	COMMENT '유저닉네임'
);

CREATE TABLE `base_code` (
	`code_id`	varchar(100)	NOT NULL,
	`code_name`	varchar(100)	NULL,
	`description`	varchar(1000)	NULL
);

CREATE TABLE `item_info` (
	`item_id`	varchar(100)	NOT NULL	COMMENT '상품의 아이디',
	`store_kind`	varchar(100)	NULL	COMMENT '상품이 있는 편의점 종류',
	`item_name`	varchar(100)	NOT NULL	COMMENT '상품의 이름',
	`item_category`	varchar(100)	NULL	COMMENT '상품의 카테고리 종류',
	`item_price`	decimal(10, 0)	NOT NULL	COMMENT '상품의 가격',
	`item_image`	varchar(100)	NULL	COMMENT '상품의 이미지 주소',
	`item_description`	varchar(1000)	NULL	COMMENT '상품에 대한 설명',
	`insert_date`	timestamp	NULL	DEFAULT CURRENT_TIMESTAMP	COMMENT '상품이 추가된 날짜'
);

CREATE TABLE `item_rate_user` (
	`seq`	int(10)	NOT NULL	DEFAULT auto_increment	COMMENT '후기에 대한 seq 컬럼, 아이디라고 보면된다',
	`user_id`	varchar(30)	NOT NULL	COMMENT '후기를 입력한 유저의 아이디',
	`item_id`	varchar(100)	NOT NULL	COMMENT '후기를 입력한 상품의 아이디',
	`item_score`	tinyint	NULL	COMMENT '선택한 평점',
	`item_comment`	varchar(1000)	NULL	COMMENT '입력한 후기',
	`delete_yn`	varchar(5)	NOT NULL	DEFAULT 'N'	COMMENT '후기 삭제 여부 확인(Y, N)',
	`insert_date`	timestamp	NOT NULL	DEFAULT CURRENT_TIMESTAMP	COMMENT '후기를 입력한 시간',
	`update_date`	timestamp	NOT NULL	DEFAULT CURRENT_TIMESTAMP	COMMENT '후기를 수정한 시간'
);

CREATE TABLE `store_info` (
	`store_id`	varchar(100)	NOT NULL	COMMENT '편의점아이디',
	`store_kind`	varchar(100)	NOT NULL	COMMENT '편의점종류',
	`store_name`	varchar(100)	NOT NULL	COMMENT '편의점이름'
);

CREATE TABLE `item_rate_user_like` (
	`select_user_id`	varchar(30)	NOT NULL	COMMENT '좋아요를 누른 유저 아이디',
	`seq`	int(10)	NOT NULL	DEFAULT auto_increment	COMMENT '좋아요를 누른 후기의 아이디',
	`target_user_id`	varchar(30)	NOT NULL	COMMENT '후기를 작성한 유저의 아이디',
	`item_id`	varchar(100)	NOT NULL	COMMENT '후기가 입력된 상품의 아이디'
);

ALTER TABLE `user_info` ADD CONSTRAINT `PK_USER_INFO` PRIMARY KEY (
	`user_id`
);

ALTER TABLE `base_code` ADD CONSTRAINT `PK_BASE_CODE` PRIMARY KEY (
	`code_id`
);

ALTER TABLE `item_info` ADD CONSTRAINT `PK_ITEM_INFO` PRIMARY KEY (
	`item_id`
);

ALTER TABLE `item_rate_user` ADD CONSTRAINT `PK_ITEM_RATE_USER` PRIMARY KEY (
	`seq`,
	`user_id`,
	`item_id`
);

ALTER TABLE `store_info` ADD CONSTRAINT `PK_STORE_INFO` PRIMARY KEY (
	`store_id`,
	`store_kind`
);

ALTER TABLE `item_rate_user_like` ADD CONSTRAINT `PK_ITEM_RATE_USER_LIKE` PRIMARY KEY (
	`select_user_id`,
	`seq`,
	`target_user_id`,
	`item_id`
);

ALTER TABLE `item_rate_user` ADD CONSTRAINT `FK_user_info_TO_item_rate_user_1` FOREIGN KEY (
	`user_id`
)
REFERENCES `user_info` (
	`user_id`
);

ALTER TABLE `item_rate_user` ADD CONSTRAINT `FK_item_info_TO_item_rate_user_1` FOREIGN KEY (
	`item_id`
)
REFERENCES `item_info` (
	`item_id`
);

ALTER TABLE `item_rate_user_like` ADD CONSTRAINT `FK_item_rate_user_TO_item_rate_user_like_1` FOREIGN KEY (
	`seq`
)
REFERENCES `item_rate_user` (
	`seq`
);

ALTER TABLE `item_rate_user_like` ADD CONSTRAINT `FK_item_rate_user_TO_item_rate_user_like_2` FOREIGN KEY (
	`target_user_id`
)
REFERENCES `item_rate_user` (
	`user_id`
);

ALTER TABLE `item_rate_user_like` ADD CONSTRAINT `FK_item_rate_user_TO_item_rate_user_like_3` FOREIGN KEY (
	`item_id`
)
REFERENCES `item_rate_user` (
	`item_id`
);

