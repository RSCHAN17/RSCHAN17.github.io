DROP TABLE IF EXISTS gigs;
create table gigs (
    gig_id int generated always as identity,
    date DATE not null,
    name varchar(100) not null,
    type varchar(100) default 'gig',
    check (type in ('gig','festival'))
);

insert into gigs (name,date) 
values 
    ('You me at six','2017-04-15'), ( 'Fall out boy','2018-03-31' ), ( 'Ajr/Emily Burns','2018-08-28' ), ( 'Arctic monkeys','2018-09-10' ), ( 'Nothing but thieves','2018-11-23' ), ( 'The 1975','2018-11-29' ), ( 'You me at six','2018-11-30' ), ( 'Ajr','2019-02-13' ), ( 'Catfish and the bottlemen','2019-02-22' ), ( 'Circa waves','2019-03-19' ), ( 'Panic at the disco/against the current','2019-03-28' ), ( 'Set it off','2019-04-18' ), ( 'Circa waves/night café','2019-04-26' ), ( 'Ajr','2019-05-13' ), ( 'Two door cinema club','2019-06-13' ), ( 'Jon Belion','2019-10-04' ), ( 'Two door cinema club/Tom Grennan','2019-10-11' ), ( 'Catfish and the bottlemen','2019-11-11' ), ( 'AJR','2019-12-10' ), ( 'Catfish and the bottlemen','2020-02-08' ), ( 'Beartooth','2020-02-29' ), ( 'Emily burns','2021-09-09' ), ( 'Grime FM ft JME','2021-10-08' ), ( 'The Kooks','2022-02-19' ), ( 'Lumineers','2022-03-04' ), ( 'Ajr','2022-10-01' ), ( 'Panic at the disco','2023-03-07' ), ( 'The vaccines','2024-02-09' ), ( 'Seagirls/Oliver Keane','2024-03-20' ), ( 'The magic gang','2024-05-23' ), ( 'Lawrence','2024-07-05' ), ( 'The Amazons','2024-07-16' ), ( 'James Bay/Kingfishr','2025-02-13' ), ( 'Circa waves','2025-02-26' ), ( 'Kingfishr','2025-03-25' ), ( 'Dayglow','2025-03-28' ), ( 'You me at six/kid kapachi/the xcerts','2025-04-14' ), ( 'Vincent Lima','2025-04-12' ), ( 'Danny Addison/Conor McLain','2025-05-15' ), ( 'Lugnut/artroom','2025-05-22' ), ( 'Will linley','2025-05-31' ), ( 'Sam Fender/Olivia Dean','2025-06-07' ), ( 'James Bay/Freya Riding','2025-07-19' ), ( 'Kingfishr - acoustic','2025-08-25' ), ( 'Kingfishr - pub','2025-08-26' ), ( 'The Wombats/Razorlight','2025-08-30' ), ( 'Cameron Whitcomb','2025-09-05' ), ( 'Knox/Will linley','2025-09-15' ), ( 'Lewis Capaldi/Skye Newman/Aaron rowe','2025-09-16' ), ( 'Zach Gordon','2025-09-22' ), ( 'Lord Huron/pillow queens','2025-09-24' ), ( 'Ziggy Albert/Anne dean','2025-10-23' ), ( 'Will linley','2025-11-05' ), ( 'Tristwch Y Fenywod','2025-11-12' ), ( 'Lawrence/Maya Delilah','2025-11-24' ), ( 'Wolf Alice','2025-12-03' ), ( 'Kingfishr/Jack Cullen','2025-12-04' ), ( 'Mumford and sons','2025-12-10' ), ( 'Kingfishr/Aaron rowe','2025-12-19' );
insert into gigs (name, date, type)
values
    ('Reading (Weekend) - 2017','2017-08-25','festival'), ('Community - 2018','2018-07-01','festival'), ('Wide Awake - 2022','2022-05-28','festival'), ('Slam Dunk - 2024','2024-05-25','festival'), ('A-list - 2025','2025-03-13','festival'), ('BST - 2025','2025-07-04','festival'), ('Reading (Friday) - 2025','2025-08-22','festival');

DROP TABLE IF EXISTS temp;
create table temp as select * from gigs order by date asc;
alter table temp drop column gig_id;
truncate table gigs restart identity;
insert into gigs (date,name,type) select * from temp;
drop table temp;
alter table gigs add primary key (gig_id);

DROP TABLE IF EXISTS cliches;
create table cliches (
    cliche_id int generated always as identity,
    cliche varchar(255) not null,
    status varchar(100) default 'accepted',
    origin varchar(100) default 'BTFAQL',
    insta varchar(100) default 'raza.chandna',
    primary key (cliche_id),
    check (status in ('pending','accepted','rejected'))
);

insert into cliches (cliche)
values
    ('Tall man spawning directly in front of you'),('Someone turned around whole song'),('Facetime'),('Weird device'),('No clue what''s going on'),('On shoulders'),('Crowd surfer'),('Lookalike'),('Weird interaction with stranger'),('Getting / Viewing beered'),('Clothing Chucked'),('Lighter'),('Someone you actually know'),('Premature moshing'),('Blinding Lights'),('Confetti'),('Cardboard sign'),('Screaming the whole time'),('Mismatched acts'),('Uncomfortably long encore wait'),('Random single living their best life'),('Music industry/ political/ religious speech'),('Football shirt'),('Movie/TV shirt'),('This is our "last song"'),('Artist "can''t believe they''re there"'),('Missing shoe in mosh'),('Phone torch looking for something'),('S/O dragged along but having an amazing time'),('Getting a ticket day of'),('Scary fan (way too invested)'),('Artist restarting the song'),('The artist''s music being blasted on route back'),('Someone dressed like the artist'),('Fake merch'),('Queuing up for over 3 hrs outside'),('Setlist / drumstick being chucked into the crowd'),('Surprise guest'),('Snapchat'),('Getting Merch');
insert into cliches (cliche)
values
    ('Same gig merch'),('"oh my friends are just ahead"'),('Snaking 50m ahead'),('Lighthouse torch person'),('On phone more than watching gig'),('Vaping'),('Follows set list'),('Screaming louder than the artist'),('Talking through song'),('Thanking the crew');
