CREATE OR REPLACE FUNCTION check_if_donor_exist()
RETURNS TRIGGER
LANGUAGE PLPGSQL
AS
$$
DECLARE
count_donor integer;
BEGIN
SELECT COUNT(*) INTO count_donor from donors 
WHERE uid=NEW.uid;

if count_donor < 1 then
	INSERT INTO donors(donation_id, uid)
	VALUES (NEW.donation_id, NEW.uid);
END IF;
RETURN NEW;
END;
$$;

CREATE TRIGGER insert_donor
AFTER INSERT
ON transactions
FOR EACH ROW
EXECUTE PROCEDURE check_if_donor_exist();

 
 -- DUMMY DATA

 INSERT INTO users(uid, profession, ktp_img_url, gender, address)
 VALUES ('A123',
 		'Programmer',
		 '123.com',
		 'Male',
		 'Depok');

 INSERT INTO users(uid, profession, ktp_img_url, gender, address)
 VALUES ('C356',
 		'Programmer',
		 '356.com',
		 'Male',
		 'Depok');

INSERT INTO donation_items(donation_id, uid, name, description)
VALUES ('21C3',
		'A123',
		'Galang dana',
		'');

INSERT INTO transactions(transaction_id, uid, donation_id, nominal)
VALUES ('V24', 'C356', '21C3', 2000);

DELETE FROM transactions WHERE transaction_id='21C3';