from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager

class AccountManager(BaseUserManager):
    def create_user(self, username, phone_number, email, password=None):
        if not email:
            raise ValueError('Email is required')
        if not password:
            raise ValueError('Password is required')
        
        user = self.model(
            email=self.normalize_email(email),
            username=username,
            phone_number=phone_number,
        )
        user.set_password(password)
        user.save(using=self._db)
        return user
    
    def create_superuser(self, username, phone_number, email, password=None):
        user = self.create_user(
            email=self.normalize_email(email),
            password=password,
            username=username,
            phone_number=phone_number
        )
        user.is_active = True
        user.is_staff = True
        user.is_superadmin = True
        user.save(using=self._db)
        return user

class Account(AbstractBaseUser):
    username = models.CharField(max_length=50)
    email = models.EmailField(max_length=100, unique=True)
    phone_number = models.CharField(max_length=50, unique=True)
    profile_pic = models.ImageField(upload_to='user/profile_pic/', null=True, blank=True)

    # required fields
    date_joined = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=False)
    is_superadmin = models.BooleanField(default=False)
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'phone_number']
    
    objects = AccountManager()
    
    def __str__(self):
        return self.email
    
    def full_name(self):
        # Assuming username is used as the full name
        return self.username
    
    def has_perm(self, perm, obj=None):
        return self.is_superadmin
    
    def has_module_perms(self, app_label):
        return True
