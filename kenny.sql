PGDMP                          x            estate    12.1    12.1                0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                        0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            !           1262    16393    estate    DATABASE     �   CREATE DATABASE estate WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'English_Canada.1252' LC_CTYPE = 'English_Canada.1252';
    DROP DATABASE estate;
                postgres    false            �            1259    16394    estate    TABLE     �   CREATE TABLE public.estate (
    estate_id uuid NOT NULL,
    estate_name character varying(50) NOT NULL,
    estate_description character varying NOT NULL
);
    DROP TABLE public.estate;
       public         heap    postgres    false            �            1259    24576    suite_photos    TABLE     �   CREATE TABLE public.suite_photos (
    suite_photo_id uuid NOT NULL,
    suite_photo character varying(225),
    suite_id uuid
);
     DROP TABLE public.suite_photos;
       public         heap    postgres    false            �            1259    24581    suites    TABLE       CREATE TABLE public.suites (
    suite_id uuid NOT NULL,
    suite_name character varying(50) NOT NULL,
    suite_description character varying(225) NOT NULL,
    num_of_rooms integer NOT NULL,
    suite_address character varying(50) NOT NULL,
    suite_price numeric(9,0) NOT NULL
);
    DROP TABLE public.suites;
       public         heap    postgres    false            �            1259    24596    suites_features    TABLE     �   CREATE TABLE public.suites_features (
    feature_id uuid NOT NULL,
    feature_name character varying(30) NOT NULL,
    feature_details character varying(150) NOT NULL,
    features_logo character varying(255) NOT NULL
);
 #   DROP TABLE public.suites_features;
       public         heap    postgres    false            �            1259    24591    user_reserves    TABLE     -  CREATE TABLE public.user_reserves (
    user_id uuid NOT NULL,
    fullname character varying(50) NOT NULL,
    email character varying(100) NOT NULL,
    phone character varying(11) NOT NULL,
    suites_selected character varying(50) NOT NULL,
    more_information character varying(225) NOT NULL
);
 !   DROP TABLE public.user_reserves;
       public         heap    postgres    false                      0    16394    estate 
   TABLE DATA                 public          postgres    false    202   �                 0    24576    suite_photos 
   TABLE DATA                 public          postgres    false    203   "                 0    24581    suites 
   TABLE DATA                 public          postgres    false    204   <                 0    24596    suites_features 
   TABLE DATA                 public          postgres    false    206   �                 0    24591    user_reserves 
   TABLE DATA                 public          postgres    false    205   �          x  x�ES�n�0��?,rQ�F��I��
$��E
�i{^Qk��U�����r�����������gzx|�ISn�5[���Пo?~����~w}{˻�����\�\�M�v��./v��'���M���x?���&k�I|bK�NG�D��>�����#����Z�`5�5�l�H-J��ê_�>�Hi�nO�z֚�`Qt��:B#A?�4�y�!�$!�Ѧ�}�v39�}�^��<H�:���l�a��{��e���W �[q�ٗ�y&6F1�ԝ@���sk�M�&��>;/xK��%��M��!��i�eP�Śxm�uܩ>UМR�mN��{{��e� n��PD�rB~$@'��X���̈́�KYQ5��	���Oqc1k�o��%���y{�:[��:�i��.K�*���\�c�3�C�����l�R+�{ʭE,�4BG�d�r������$��!ྠ���(�~�T���k��>��\��;�:Mb�q����'!���h�z+�?�[Y��  ���)l���;8e�����`���(����1�й�S�آ����hZ�ϐ��M���qV|w��5�/b��ӖJG�����(	�I�`n�������i�|��Z��>�x�         
   x���             9  x���MK1����U��$�O<)�R�����K�nٴ{�7�$hу��;9</Ϭ6��KCV��N���m>uǘ��~��ؒ�9��'�X�G5��vA���ߐ�rxȮ����&�c��<�F��������8����w����&�*W�Ah����Xǥ�IP���i�e2~���otA-�\{0�G>$0�! �.X.)V�S�s�+?�8�0�t�*�DN��Ї�NƮI3�]_~9��Gp�k�8$Z� �5`���,�Q�R���9U	(����LR�x#��X�X+X)CT4�~RR1�i��)8����5�         
   x���             �   x����j�0�{�·t0�v��]�Cm
k��Pl�x4͈�B߾I;
BH�|e�_Ԭ����C��!Q����ϔ����s�g�\{�+�=HJZn�[pKF�@����,'�{����B�S�ݦ��|Z�������0�H#��mcJc�n5�S<�"���5+��zOJ�Yr���]z���lt�^=ȭ"������hrf���i      